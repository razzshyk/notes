const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const dotenv = require("dotenv")

dotenv.config({path : "./config.env"})


const route = require("./routes/auth")
app.use(express.json())
app.use(route)


require("./db/connection")

app.get(("/"), (req, res) => {
    res.send("<h1>Hello World<h1>")
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

