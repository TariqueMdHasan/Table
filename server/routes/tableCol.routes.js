const express = require('express')
const router = express.Router()
const { saveColData, getColData } = require('../controllers/tableCol.controller.js')

router.post('/colData', saveColData)
router.get('/colData', getColData)

module.exports = router