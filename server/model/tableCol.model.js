const mongoose = require('mongoose')

const tableColSchema = new mongoose.Schema({
    columnId: String,
    width: Number,
    position: Number
})


module.exports = mongoose.model("tableCol", tableColSchema)