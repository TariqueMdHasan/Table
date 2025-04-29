const express = require('express')
const router = express.Router()
const {createUserData, getAllTableData, getTenUserData, updateTableData, deleteTableRow} = require('../controllers/table.controllers.js')

router.post('/create', createUserData)
router.get('/full-table', getAllTableData)
router.get('/data', getTenUserData)
router.patch('/data/:id', updateTableData)
router.delete('/data/:id', deleteTableRow)





module.exports = router