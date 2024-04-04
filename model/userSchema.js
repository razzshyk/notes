const mongoose = require("mongoose")
const myDb = require("../db/connection")

const userSchema = mongoose.Schema({
    fname : {
        type : String,
        require:true
    },
    lname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const Users = mongoose.model("USERS",userSchema)
module.exports = Users