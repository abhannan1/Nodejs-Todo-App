const mongoose  = require("mongoose")


const connection = () => {
mongoose.connect(process.env.db_Url, {useNewUrlParser:true , useUnifiedTopology:true, dbName:"TodoApp"})
.then(()=>{
    console.log("DB connected")
})
.catch((error)=>{
    console.log("DB connection failed:" + error.message)
})
}

module.exports.connect = connection