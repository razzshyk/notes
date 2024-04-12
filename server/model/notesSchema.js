const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    uid : {
        type: String,   // this for the current logged in user id so that it only shows his notes not others.
        require: true
    },
    title: {
        type: String,
        require: true
    },
    notes: {
        type: String,
        require: true
    }
})


const Notes = mongoose.model("Note",notesSchema)
module.exports = Notes