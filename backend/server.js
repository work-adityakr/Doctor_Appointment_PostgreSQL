import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import { connectCloudinay } from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import  doctorRoute  from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

// connectDB();
connectCloudinay()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

//api endpoints
app.use('/api/admin',adminRouter)// localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRoute)
app.use('/api/user',userRouter)



app.get('/',(req,res)=>{
   res.send("API WORKING")
})

app.listen(port,()=> console.log("Server Started",port))
