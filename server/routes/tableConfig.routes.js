const express = require('express')
const router = express.Router()
const {postConfig, getConfig} = require('../controllers/tableConfig.controller.js')


router.get('/getConfig', getConfig)
router.post('/postConfig', postConfig)



module.exports = router