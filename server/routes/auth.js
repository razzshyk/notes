const express = require("express")
const mongoose = require("mongoose")
const route = express.Router()
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("../db/connection")
const User = require("../model/userSchema")


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

    } else if (!emailRegex.test(email)) {
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
                console.log("token generated successfully:", token)
                // res.status(200).send({ message: "User logged in successfully." });  cannot send multiple res to client in a single attempt as it shows headers error
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 258920000),
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




module.exports = route