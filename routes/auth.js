const express = require("express")
const mongoose = require("mongoose")
const route = express.Router()

require("../db/connection")
const User = require("../model/userSchema")


route.get(("/"), (req, res) => {
    res.send("<h1>Hello from the router<h1>")
})


// Sign up Api
route.post(("/signup"), (req, res) => {
    const { fname, lname, email, age, password } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(req.body.fname)

    if (!fname || !lname || !email || !age || !password) {
        res.status(400).send({ error: "fill all Fields please" })
        return
    } else if (password.length > 8) {
        res.status(413).send({ error: " password should be less than 8" })
        return
    } else if (!emailRegex.test(email)) {
        res.status(422).send({ error: " invalid email" })
        return
    } else if (typeof fname !== 'string' || typeof lname !== 'string') {
        res.status(400).send({ error: "Invalid name" });
        return;
    }

    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            res.status(422).send({ error: " user is already exist " })
            return
        }
        const user = new User({ fname, lname, email, age, password })
        user.save().then(() => {
            res.status(201).json({ mesaage: "Data is succesfly uploaded in DB" })
        }).catch((err) => { res.status(500).json({ error: "failed To registered" }) })

    }).catch((e) => console.log(e))
})

// Login Api
route.post("/login", (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body.email)

    if (!email || !password) {
        return res.status(400).send({ error: "Fill all fields, please." });
    } else if (password.length > 8) {
        return res.status(413).send({ error: "Password should be less than 8 characters." });
    } else if (!emailRegex.test(email)) {
        return res.status(422).send({ error: "Invalid email." });
    }

    
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(422).send({ error: "User does not exist with this email." });
        }

        if (user.password !== password) {
            return res.status(401).send({ error: "Incorrect password." });
        }

        res.status(200).send({ message: "User logged in successfully." });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ error: "Internal server error." });
    });
});




module.exports = route