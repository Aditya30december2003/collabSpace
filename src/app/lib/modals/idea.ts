import {models , model , Schema} from 'mongoose'

const IdeaSchema = new Schema(
    {
    title:{type:String , required:true},
    description:{type:String , required:true}, 
    user:{type:Schema.Types.ObjectId, ref:'User'},   // dont use 'string' use String otherwise it wont populate
    },
{
    timestamps:true
})

const Idea = models.Idea || model('Idea', IdeaSchema)
export default Idea 