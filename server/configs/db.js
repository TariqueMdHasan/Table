const mongoose = require("mongoose")

const connectionDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('database connected sucessfully'))
        .catch((error)=> console.log('not connected to database', error))
    }catch(error){
        console.log("mongodb is facing problem, check db.js", error)
    }
}

module.exports = connectionDB;