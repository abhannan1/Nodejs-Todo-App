const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    tittle:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,

    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
    
},
{timestamps:true}
) 


module.exports = mongoose.model("Task", taskSchema)