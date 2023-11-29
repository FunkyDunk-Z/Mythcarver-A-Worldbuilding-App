const mongoose = require('mongoose')
// const modelTimestamp = require('../middleware/modelTimestamp')
const addToUserCodex = require('../middleware/addToUserCodex')

const Schema = mongoose.Schema

const sizes = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
  'colossal',
]

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
  subSpecies: [
    {
      type: Schema.ObjectId,
      ref: 'Species',
    },
  ],
  articles: [
    {
      articleName: {
        type: String,
      },
      articleContent: {
        type: String,
      },
    },
  ],
  size: {
    type: String,
    required: true,
    enum: sizes,
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
  lifeSpan: {
    type: Number,
    required: true,
  },
  portrait: String,
})

// mongoose.plugin(modelTimestamp)
mongoose.plugin(addToUserCodex, 'species')

const Species = mongoose.model('Species', speciesSchema)

module.exports = Species
