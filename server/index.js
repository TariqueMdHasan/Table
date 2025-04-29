const express = require("express")
const mongoose = require("mongoose")
const connectionDB = require("./configs/db.js")
const dotenv = require('dotenv')
// const bodyParser = require('body-parser')
const tableData = require('./routes/table.routes.js')


const app = express()


dotenv.config();

connectionDB();

app.use(express.json())

const PORT = process.env.PORT || 8000;

app.use('/api/table', tableData)

app.get("/", (req, res)=> {
    res.send("hello jii")
})

app.listen(PORT, (req, res)=> {
    console.log(`everithing is fine at localhost ${PORT}`)
})