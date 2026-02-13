import validator from 'validator'
import { prisma } from '../config/postgresql.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
// import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
// import appointmentModel from '../models/appointmentModel.js'
// import doctorModel from '../models/doctorModel.js'
import razorpay from 'razorpay'

//API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password of 8 digit" })
        }

        const userExists = await prisma.user.findUnique({
            where:{email:email}
        });

        if(userExists){
            return res.
            status(400)
            .json({error:"User already exists with this email"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
        })


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        res.json({ success: true, token ,user });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ 
            where: {email:email}
        })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
             
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            }

            res.cookie("token",token,options).status(200).json({ success: true, token ,user ,message:"User login successful"})
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId
        console.log("Fetching profile for ID:", userId);

        const userData = await prisma.user.findUnique({
            where:{id:userId},
            omit: { password: true }
        })

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//  API to update user profile 
const updateProfile = async (req, res) => {
    try {

        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Authentication failed." });
        }

        const { name, phone, address: addressString, dob, gender } = req.body;
        const imageFile = req.file;

        const updateData = {};

        // Populate the object with provided text fields
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (dob) updateData.dob = dob;
        if (gender) updateData.gender = gender;


        if (addressString) {
            try {
                updateData.address = JSON.parse(addressString);
            } catch (e) {
                return res.status(400).json({ success: false, message: "Invalid address format. Address must be a valid JSON string." });
            }
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            if (imageUpload && imageUpload.secure_url) {
                updateData.image = imageUpload.secure_url;
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, message: "No data provided to update." });
        }


        const updatedUser = await prisma.user.update({
            where:{id:userId},
            data:updateData,
            omit:{password:true}
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, message: "Profile Updated Successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the profile." });
    }
}


//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body;
        const userId = req.userId;
        const docData = await prisma.doctor.findUnique({
            where:{id:docId},
        })

        if (!docData ||!docData.available) {
            return res.status(400).json({ success: false, message: 'Doctor is not available' });
        }

      
        let slots_booked = docData.slots_booked || {};

        // Check for the slot in the correct date array ---
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(409).json({ success: false, message: 'This time slot is already booked' });
            }
            else {
                // If the date exists, just add the new time
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            // If the date doesn't exist, create it with the new time
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await prisma.user.findUnique({
            where:{id:userId},
            omit:{password:true}
        })

        const docDataSnapshot = { ...docData };
        delete docDataSnapshot.slots_booked;
        delete docDataSnapshot.password;

        const appointmentData = await prisma.appointment.create({
           data:{userId,
            docId,
            userData,
            docData:docDataSnapshot,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: new Date()}
        });

        // Save new slots data in docData
        await prisma.doctor.update({
            where:{id:docId},
            data:{
                slots_booked:slots_booked
            }
        })

        res.status(201).json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error: Could not book appointment." });
    }
}


//API to get user appointments for forntend my-appointment page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.userId;
        const appointment = await prisma.appointment.findMany({ where:{id:userId} })
        res.json({ success: true, appointment })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { appointmentId } = req.body
        const appointmentData = await prisma.appointment.findUnique({
            where:{id:appointmentId}
        });

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await prisma.appointment.update({
            where:{id:appointmentId},
            data:{ cancelled: true }
        });

        //releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await prisma.doctor.findUnique({
            where:{id:docId}})

        if (doctorData) {
            // Ensure slots_booked is treated as an object
            let slots_booked = { ...doctorData.slots_booked };

            // Only filter if the date exists in the record
            if (slots_booked[slotDate]) {
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
                
                // Cleanup empty date keys to keep the DB small
                if (slots_booked[slotDate].length === 0) {
                    delete slots_booked[slotDate];
                }

                //  Update the doctor's master calendar
                await prisma.doctor.update({
                    where: { id: docId },
                    data: { slots_booked }
                });
            }
        }

        res.json({ success: true, message: "Appointment cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//API to make payment of appointment using razorpay
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {

    try {
        const { appointmentId } = req.body
        const appointmentData = await prisma.appointment.findUnique({
            where:{id:appointmentId}
        });

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }

        //creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY || 'INR',
            receipt: appointmentId
        }

        //creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


//API to verify payment of razorpay
const verifyRazorpay = async(req,res) =>{
    try {
         const{razorpay_order_id} = req.body
         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
         
         if(orderInfo.status === 'paid'){
            await prisma.appointment.update({
                where:{id:orderInfo.receipt},
                data:{payment:true}})
            res.json({success:true,message:"Payment Successful"})
         }else{
            res.json({success:false,message:'Payment failed'})
         }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// this is standard method to verify the user payment in rezorpay
// import crypto from 'crypto';

/// Inside your function:
// const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// const sign = razorpay_order_id + "|" + razorpay_payment_id;
// const expectedSign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(sign.toString())
//     .digest("hex");

// if (expectedSign === razorpay_signature) {
//     // Payment is 100% authentic
//     await prisma.appointment.update({
//         where: { id: appointmentId }, // Passed from frontend or fetched
//         data: { payment: true }
//     });
// }





export { registerUser, loginUser, getProfile, updateProfile, bookAppointment,listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay}
