const mongoose = require('mongoose')

const tableConfigSchema = new mongoose.Schema({
    columnWidth: {
        type: Object,
        default: {}
    },
    columnOrder: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('tableConfig', tableConfigSchema)