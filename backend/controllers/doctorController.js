import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/postgresql.js'


const changeAvailablity = async (req, res) => {

    try {

        const { docId } = req.params || req.body

        const docData = await prisma.doctor.findUnique({
            where: { id: docId }
        });

        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        const updatedDoctor = await prisma.doctor.update({
            where:{id:docId}, 
            data:{ available: !docData.available}
        });

        res.json({ success: true, message: docData.message })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


const doctorList = async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany({
            omit:{password:true,email:true}
        })
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Api for doctor login
const logindoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await prisma.doctor.findUnique({ 
           where: {email} })
        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: 'Invalid credentials' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await prisma.appointment.findMany({ where:{docId:docId }})

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//API to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId; // Get from middleware for security
        const { appointmentId } = req.body;
        const appointmentData = await prisma.appointment.findUnique({
            where:{id:appointmentId}
        })

        if (appointmentData && appointmentData.docId === docId) {
            await prisma.appointment.update({
                where:{id:appointmentId}, 
                data:{ isCompleted: true }
            });
            return res.json({ success: true, message: 'Appointment Completed' })
        }
        else {
            return res.json({ success: false, message: 'Mark failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to cancel appointment completed for doctor panel

const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId; // Get from middleware for security
        const { appointmentId } = req.body;
        const appointmentData = await prisma.appointment.findUnique({where:{id:appointmentId}
        });

        if (appointmentData && appointmentData.docId === docId) {
            await prisma.appointment.update({
                where:{id:appointmentId},
                data:{ cancelled: true }
            });
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }
        else {
            return res.json({ success: false, message: 'Cancelation failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {

    try {
        const docId = req.docId;

        const appointments = await prisma.appointment.findMany({ where:{docId:docId} ,
        include: { user: { select: { name: true, image: true } } } 
        });

        let earning = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount
            }
        })
        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })


        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//API to get doctor profile for Doctor panel
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId
        const profileData = await prisma.doctor.findUnique({
            where:{id:docId},
            omit:{password:true}
        })

        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

          const docId = req.docId;
        const {fees, address, available } = req.body
        await prisma.doctor.update({
            where:{id:docId}, 
            data:{ 
                fees: Number(fees), 
                address: typeof address === 'string' ? JSON.parse(address) : address, 
                available: available === 'true' || available === true
             }
        })

        res.json({ success: true, message: 'Profile updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}





export { changeAvailablity, doctorList, logindoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile }

