import { model , models , Schema } from "mongoose";

const UserSchema= new Schema(
    {
        name:{type:String , required:true},
        email:{type:String , required:true , unique:true},
        password:{type:String , required:true},
        isVerified:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgetPasswordToken:String,
        forgetPasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date
    },
    {
        timestamps:true
    }
)

const User = models.User || model("User", UserSchema)
export default User