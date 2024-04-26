const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")

dotenv.config({path : "./config.env"})
const PORT = process.env.PORT || 5000;


app.use(express.json())
const route = require("./routes/auth")
app.use(route)


require("./db/connection")

app.get(("/"), (req, res) => {
    res.send("<h1>Hello World<h1>")
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

