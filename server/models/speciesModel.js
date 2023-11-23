const mongoose = require('mongoose')
const modelTimestamp = require('../middleware/modelTimestamp')
const addToUserCodex = require('../middleware/addToUserCodex')

const Schema = mongoose.Schema

const speciesSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  speciesName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    default: 30,
  },
  traits: [
    {
      type: Schema.ObjectId,
      ref: 'Trait',
    },
  ],
  origins: {
    type: String,
    default: '',
  },
  lifeSpan: {
    type: String,
    required: true,
  },
  image: String,
})

// mongoose.plugin(modelTimestamp)
mongoose.plugin(addToUserCodex, 'species')

const Species = mongoose.model('Species', speciesSchema)

module.exports = Species
