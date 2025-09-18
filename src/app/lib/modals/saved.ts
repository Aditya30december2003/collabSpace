import {Schema , model , models} from 'mongoose'

const SaveSchema = new Schema(
    {
        user:{type:Schema.Types.ObjectId , ref:"User"},
        idea:{type:Schema.Types.ObjectId , ref:"Idea"}
    },
    {
        timestamps:true
    }
)

// to prevent duplicate saves 🔥🔥🔥
SaveSchema.index({user:1 , idea:1},{unique:true})

const Save = models.Save || model("Save" , SaveSchema)

export default Save