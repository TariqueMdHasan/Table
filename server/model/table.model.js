const mongoose = require("mongoose")

const tableDataSchema = new mongoose.Schema({
    checkbox: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/9/95/Salman_Khan_in_2023_%281%29_%28cropped%29.jpg"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('tableData', tableDataSchema)