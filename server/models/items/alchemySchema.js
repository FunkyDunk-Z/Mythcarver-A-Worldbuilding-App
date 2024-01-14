const mongoose = require('mongoose')
const addToUserCodex = require('../middleware/addToUserCodex')

const Schema = mongoose.Schema

const alchemySchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  traitName: {
    type: String,
    required: true,
  },
})

mongoose.plugin(addToUserCodex, 'alchemy')

const Alchemy = mongoose.model('Alchemy', alchemySchema)

module.exports = Alchemy
