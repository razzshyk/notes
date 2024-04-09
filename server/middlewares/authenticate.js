const jwt = require("jsonwebtoken")
const User = require("../model/userSchema")

const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.cookie;
        if (!token) {
            return res.status(404).send({ error: "you have to login first" })
        }
        const jwtToken = token.split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('jwtoken='))
            .split('=')[1]; 


        const verifytoken = jwt.verify(jwtToken, process.env.PRIVATEKEY) // ye hamara loggin wala user ha usko verify karega
        const loggedUser = await User.findOne({ _id: verifytoken._id, "tokens.token": jwtToken }) // ye usko check karra ha ke wo db me ha bhi ya nhi

        // if (!loggedUser) {
        //     throw new Error("User not found nhi ha bhai ye db me ")
        // }
        req.token = jwtToken
        req.loggedUser = loggedUser
        req.userID = loggedUser._id

        next(); //most important otherwise it stucks in this middleware
    } catch (error) {
        res.status(401).send("user is not authorized")
        console.log(error)
    }
}

module.exports = Authenticate;