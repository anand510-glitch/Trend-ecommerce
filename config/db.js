import mongoose from "mongoose"


const connectDB= async ()=>{
    try{
     const conn =await mongoose.connect(process.env.MONGO_URL)
     console.log(`connected to Mongo Db ${conn.connection.host}`)
    }
    catch(error){
          console.log(`error in mongodb ${error}`.bgRed.white)
    }
}
export default connectDB;