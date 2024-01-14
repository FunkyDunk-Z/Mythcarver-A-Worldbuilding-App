const mongoose = require('mongoose')
// const modelTimestamp = require('../middleware/modelTimestamp')
const addToUserCodex = require('../middleware/addToUserCodex')

const Schema = mongoose.Schema

const sizes = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
  'Colossal',
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
  isSubSpecies: {
    type: Boolean,
    default: false,
  },
  subSpecies: [
    {
      type: Schema.ObjectId,
      ref: 'Species',
    },
  ],
  articles: [
    {
      _id: false,
      articleName: String,
      articleContent: String,
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
  lifespan: {
    type: String,
    required: true,
  },
  portrait: String,
})

// mongoose.plugin(modelTimestamp)
mongoose.plugin(addToUserCodex, 'species')

const Species = mongoose.model('Species', speciesSchema)

module.exports = Species
