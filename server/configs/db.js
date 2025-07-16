import mongoose from "mongoose";


const connectDB = async () => {
    await mongoose.connection.on("connected",()=>{
        console.log("MongoDB Connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/crypto`)
}

export default connectDB;