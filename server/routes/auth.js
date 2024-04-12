const express = require("express")
const mongoose = require("mongoose")
const route = express.Router()
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("../middlewares/authenticate")
const filterUserNotes = require("../middlewares/filterUserNotes")

require("../db/connection")
const User = require("../model/userSchema")
const PostNotes = require("../model/notesSchema")


route.get(("/"), (req, res) => {
    res.send("<h1>Hello from the router<h1>")
})


// Sign up Api
route.post(("/signup"), (req, res) => {
    const { fname, lname, email, age, password } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // console.log(req.body.fname)

    if (!fname || !lname || !email || !age || !password) {
        return res.status(400).send({ error: "fill all Fields please" })
    } else if (password.length > 8) {
        return res.status(413).send({ error: "Password should be less than 8" })

    } else if (age > 95) {
        return res.status(413).send({ error: "Invalid Age" })

    }
    else if (!emailRegex.test(email)) {
        return res.status(401).send({ error: " invalid email" })

    } else if (typeof fname !== 'string' || typeof lname !== 'string') {
        return res.status(400).send({ error: "Invalid name" });

    }

    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.status(422).send({ error: " user is already exist " })

        }
        const user = new User({ fname, lname, email, age, password })
        // yaha pe bycrypt middleware chlygi or hash hojayega password 
        user.save().then(() => {
            res.status(201).json({ mesaage: "Data is succesfly uploaded in DB" })
        }).catch((err) => { res.status(500).json({ error: "failed To registered" }) })

    }).catch((e) => console.log(e))
})

// Login Api
route.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "fill all Fields please" })
    }
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(401).json({ error: "Invalid credendials." });
        }
        bycrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                // console.log("wrong pass entered")
                return res.status(401).json({ error: "Invalid credentials." });
            }

            // added a method in the instance of user means when user logging in this method will fire
            user.generateAuthToken().then((token) => {
                // console.log("token generated successfully:", token)
                // res.status(200).send({ message: "User logged in successfully." });  cannot send multiple res to client in a single attempt as it shows headers error
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                res.status(200).send({ message: "User logged in successfully." });
            }).catch((error) => {
                console.log("Failed to generate token:", error);
                res.status(500).send({ error: "Internal server error." });
            });

            // res.status(200).send({ message: "User logged in successfully." });
        })
    }).catch((error) => {
        console.log(error)
        res.status(500).send({ error: "Internal server error." });
    });


})


// Middlewares

// user auth using middleware : a simple js functions used in between route('/') and (req,res) and 
// it runs before of user visited that particular route


// const middleware = (req,res,next) => {
//     console.log("hello my middleware")
//     next(); it has to be called to furthur proceed the response otherwise the route will be
//             loading to internity and it stucks in this middleware
// }
// route.get("/auth", middleware, (req, res) => {
//     console.log("Hello to my auth page")
//     res.send('<h1>hello from auth page</h1>')
// })

/* output : Example app listening on port 3000
Connection Succesfull
hello my middleware /first run 
Hello to my auth page /second run
*/


// auth api

route.get("/auth", authenticate, (req, res) => {
    // console.log("my authenticate api route")
    res.send(req.loggedUser) //this sends the whole user object to my home page of the user logged in
})

// logout api
route.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', { path: "/" })
    res.status(200).send({ message: "user logout" })
})

// post notes api
route.post("/postnotes", (req, res) => {
    const { uid, title, notes } = req.body
    if (!uid) {
        return res.status(401).send({ error: "not uploaded" })
    }
    const postnotes = new PostNotes({ uid, title, notes })

    postnotes.save().then(() => {
        res.status(201).json({ mesaage: "Data is succesfully uploaded in DB" })
    }).catch((err) => { res.status(500).json({ error: "Error Occured" + err }) })
    // res.send({message : "send"})
})

// get notes api

route.get("/getnotes", filterUserNotes, (req, res) => {
    res.send(req.loggedUserNotes)
})

// update api 
route.put("/updatenotes", (req, res) => {
    
})


module.exports = route