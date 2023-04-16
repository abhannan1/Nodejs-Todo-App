const mongoose  = require("mongoose")


const connection = () => {
mongoose.connect(process.env.db_Url, {useNewUrlParser:true , useUnifiedTopology:true, dbName:"TodoApp"})
.then((c)=>{
    console.log(`DB connected with ${c.connection.host}`)
})
.catch((error)=>{
    console.log("DB connection failed:" + error.message)
})
}

module.exports.connect = connection