const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv')
const connectionDB = require("./configs/db.js")


const tableData = require('./routes/table.routes.js')
const tableCol = require('./routes/tableCol.routes.js')


const app = express()


dotenv.config();

connectionDB();

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000;

app.use('/api/table', tableData)
app.use('/api/colData', tableCol)

app.get("/", (req, res)=> {
    res.send("hello jii")
})

app.listen(PORT, (req, res)=> {
    console.log(`everithing is fine at localhost ${PORT}`)
})