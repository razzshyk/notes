const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")


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

// password hashing using bycrptjs 
userSchema.pre('save', async function(next) {
    console.log("hi from inside")
    if(this.isModified('password')){
        this.password = await bycrypt.hash(this.password,  12)
    }
    next()
});

const Users = mongoose.model("USERS",userSchema)
module.exports = Users