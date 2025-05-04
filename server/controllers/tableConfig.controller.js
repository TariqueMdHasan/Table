const express = require('express')
const tableConfig = require('../model/tableConfig.model.js')

const postConfig = async(req, res) => {
    const {columnWidth, columnOrder} = req.body

    try{
        let config = await tableConfig.findOne()
        if(!config){
            config = new tableConfig({columnWidth, columnOrder})
        }else{
            config.columnWidth = columnWidth
            config.columnOrder = columnOrder
        }

        await config.save()
        res.json({
            message: 'Success', 
            config
        })

    }catch(error){
        console.error("Error while saving column Configuration", error)
        res.status(500).json({message: "Error while saving column Configuration"})
    }
}


const getConfig = async(req, res) => {
    try{
        const config = await tableConfig.findOne();

        res.status(200).json({message: "got table column configration", config})

    }catch(error){
        console.error('not able to get table column configuration', error)
        res.status(500).json({message: 'not able to get table column configuration'})
    }
}






module.exports = {postConfig, getConfig}