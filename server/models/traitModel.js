const mongoose = require('mongoose')
const addToUserCodex = require('../middleware/addToUserCodex')

const Schema = mongoose.Schema

const traitSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  traitName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

mongoose.plugin(addToUserCodex, 'traits')

const Trait = mongoose.model('Trait', traitSchema)

module.exports = Trait
