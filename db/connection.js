const mongoose = require("mongoose")

const DB = "mongodb+srv://alifarhaan800:442UtlHlfqlIKOiY@cluster0.llfofrn.mongodb.net/"


mongoose.connect(DB).then(()=>{
    console.log("Connection Succesfull")
}).catch((e)=>console.log("error occured",e))
