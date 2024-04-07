const mongoose = require("mongoose")

const DB = process.env.DB


mongoose.connect(DB).then(()=>{
    console.log("Connection Succesfull")
}).catch((e)=>console.log("error occured",e))
