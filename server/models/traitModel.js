const mongoose = require('mongoose')
const addToUserCodex = require('../middleware/addToUserCodex')

const Schema = mongoose.Schema

const traitTypes = ['item', 'species']

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
  description: String,
  abilityMod: Number,
  traitType: {
    type: String,
    enum: traitTypes,
  },
})

mongoose.plugin(addToUserCodex, 'traits')

const Trait = mongoose.model('Trait', traitSchema)

module.exports = Trait
