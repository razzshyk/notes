const jwt = require("jsonwebtoken")
const PostNotes = require("../model/notesSchema")

const filterUserNotes = async (req, res, next) => {
    try {
        const token = req.headers.cookie;
        if (!token) {
            return res.status(404).send({ error: "you have to login first" })
        }
        const jwtToken = token.split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('jwtoken='))
            .split('=')[1]; 


        const verifytoken = jwt.verify(jwtToken, process.env.PRIVATEKEY) 
        const loggedUserNotes = await PostNotes.find({ uid: verifytoken._id })
        

        // if (!loggedUserNotes) {
        //     res.send({error:"some thing is fishy "})
        // }
        req.token = jwtToken
        req.loggedUserNotes = loggedUserNotes
        req.userID = verifytoken.uid

        next(); //most important otherwise it stucks in this middleware
    } catch (error) {
        res.status(401).send("user is not authorized")
        console.log(error)
    }
}

module.exports = filterUserNotes;