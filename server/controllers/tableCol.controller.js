const tableCol = require("../model/tableCol.model.js")

const saveColData = async(req, res) => {
    const { col } = req.body;

    try{
        await Promise.all(
            col.map(async({columnId, width, position}) => {
                await tableCol.findOneAndUpdate(
                    {columnId},
                    {width, position},
                    {upsert: true}
                )
            })
        );
        return res.json({ Sucess: true})

    }catch(error){
        console.error("failed while saving column data", error)
        res.status(500).json({message: "failed while saving column data"})
    }
}

const getColData = async(req, res) => {
    try{
        const columns = await tableCol.find({}).sort({ position: 1})
        return res.json({columns})
    }catch(error){
        console.error("failed while getting column data", error)
        res.status(500).json({message: "failed while getting column data"})
    }
}

module.exports = { saveColData, getColData }