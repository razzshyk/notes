const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }, tokens: [          // array is used because it hold many tokens as user looged in multple time a random token store along its id
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
})

// password hashing using bycrptjs 
userSchema.pre('save', async function (next) {
    // console.log("hi from inside")
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12)
    }
    next()
});

// Adding token in db

userSchema.methods.generateAuthToken = async function () {       
    try {
        let Mytoken = jwt.sign({ _id: this._id }, process.env.PRIVATEKEY)
        this.tokens = this.tokens.concat({ token: Mytoken })
        this.save()
        return Mytoken
    } catch (error) {
        console.log(error)
    }
}

const Users = mongoose.model("USERS", userSchema)
module.exports = Users