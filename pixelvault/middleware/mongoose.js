import mongoose from "mongoose";

const connectDatabase = handler=> async (req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(process.env.connectionString)
    return handler(req,res);
}
export default connectDatabase;