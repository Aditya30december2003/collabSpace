import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
export const connect=()=>{
    const connectionState = mongoose.connection.readyState

    if(connectionState===1){
          console.log("MongoDB is connected")
          return; 
    }
    if(connectionState===2){
        console.log("Connecting....")
        return;
    }
    try {
        mongoose.connect(MONGO_URI!,{
            dbName:"Project0",
            bufferCommands:true
        })
    } catch (error) {
        console.error(`Failed to conect to MongoDb:${error}`)
    }
}