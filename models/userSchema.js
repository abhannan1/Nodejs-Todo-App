const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3, "Name should be at least 3 characters long"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8, "Name should be at least 8 characters long"]

    },
},
{timestamps:true}
)

module.exports = mongoose.model("User", userSchema)