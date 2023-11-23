const mongoose = require('mongoose')
const modelTimestamp = require('../middleware/modelTimestamp')
const addToUserCodex = require('../middleware/addToUserCodex')

const nationSchema = new mongoose.Schema({
  nationName: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
})

// mongoose.plugin(modelTimestamp)
mongoose.plugin(addToUserCodex, 'nations')

const Nation = mongoose.model('Nation', nationSchema)

module.exports = Nation
