import validator from 'validator'
import bcrypt from 'bcrypt'
import { prisma } from '../config/postgresql.js'
import {v2 as cloudinary} from 'cloudinary'
import  jwt from 'jsonwebtoken'
 
// api for adding doctor
const addDoctor = async(req,res) => {
     try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

       //checking for all data to add doctor
       if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
        return res.json({success:false,message:"Missing Details"})
       }

       // validating email format
       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid Email"})
       }

       //validating strong password
       if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"})
       }

       //hashing doctor password
       const salt = await bcrypt.genSalt(10)
       const hashedpassword = await bcrypt.hash(password,salt)

       //upload image to cloudinary
       const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
       const imageUrl = imageUpload.secure_url

       const doctorData = await prisma.doctor.create({
        data:{
        name,
        email,
        image:imageUrl,
        password:hashedpassword,
        speciality,
        degree,
        experience,
        about,
        fees:Number(fees),
        address:JSON.parse(address),
        date:new Date()   
        }
       })

      res.json({success:true,doctorData, message:"Doctor added"})

     } catch (error) {
        console.log(error)
        if (error.code === 'P2002') {
            return res.json({ success: false, message: "A doctor with this email already exists" });
        }
        res.json({success:false,message:error.message})
     }
}

//API for admin login
const loginAdmin = async(req,res) => {
    try {
        
        const {email,password} =req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
            const token=jwt.sign({email},process.env.JWT_SECRET, { expiresIn: '1d' })
            res.json({success:"true",token})
        }else{
            res.json({success:false,message:"Invaild credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get doctors list for admin panel
const allDoctors = async (req,res) => {
    try{
        const doctors = await prisma.doctor.findMany({
            omit:{password:true}
        })
        res.json({success:true,doctors})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get all appointments list
const appointmentsAdmin = async(req,res) => {
    try {
        const appointments = await prisma.appointment.findMany({
          include: {
            user: {
                omit: { password: true } // Everything except password
            },
            doctor: {
                omit: { password: true } // Everything except password
            }
             }
}    );
        res.json({success:true,appointments})
    } catch (error) {
            console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to cancel appointment (Admin Panel)
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // 1. Fetch appointment using Prisma
        const appointmentData = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // 2. Mark as cancelled
        await prisma.appointment.update({
            where: { id: appointmentId },
            data: { cancelled: true }
        });

        // 3. Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await prisma.doctor.findUnique({
            where: { id: docId }
        });

        if (doctorData) {
            // Prisma returns JSON as a standard JS object
            let slots_booked = { ...doctorData.slots_booked };

            if (slots_booked[slotDate]) {
                // Remove the specific time slot
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
                
                // Cleanup: remove the date key if no slots are left
                if (slots_booked[slotDate].length === 0) {
                    delete slots_booked[slotDate];
                }

                // 4. Update doctor's master record
                await prisma.doctor.update({
                    where: { id: docId },
                    data: { slots_booked }
                });
            }
        }

        res.json({ success: true, message: "Appointment cancelled" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get dashboard data (Admin Panel)
const adminDashboard = async (req, res) => {
    try {
        // Use count() for better performance instead of fetching every record
        const doctorCount = await prisma.doctor.count();
        const userCount = await prisma.user.count();
        const appointmentCount = await prisma.appointment.count();

        // Fetch only the latest 5 appointments
        const latestAppointments = await prisma.appointment.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc' // Assuming you have a createdAt field
            },
            include: {
                user: { select: { name: true, image: true } },
                doctor: { select: { name: true, image: true } }
            }
        });

        const dashData = {
            doctors: doctorCount,
            appointments: appointmentCount,
            patients: userCount,
            latestAppointments
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addDoctor,loginAdmin,allDoctors ,appointmentsAdmin,appointmentCancel , adminDashboard }
