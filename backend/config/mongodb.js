import mongoose from "mongoose";

// const connectDB = async () => {
 
//      mongoose.connection.on('connected',() => console.log('DataBase Connected'))

//      await mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)

// }
// export default connectDB;


export const connectDB = () => {
  mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)
  .then(() => console.log("DB Connection Success"))
  .catch((err) => console.log("DB Connection Failed", err));
};