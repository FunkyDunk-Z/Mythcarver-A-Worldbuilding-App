const mongoose = require('mongoose')
const baseItemSchema = require('./itemBaseSchema')

const armourSchema = mongoose.Schema({
  ...baseItemSchema.obj,
  category: {
    type: String,
    enum: ['light', 'medium', 'heavy'],
    required: true,
  },
  defence: {
    baseDefence: {
      type: Number,
      enum: [8, 10, 12],
      required: true,
    },
    additionalDefence: {
      type: Number,
    },
  },
  gearSlot: {
    type: String,
    enum: ['head', 'chest', 'arm', 'hand', 'waist', 'leg', 'foot'],
  },
})

const Armour = mongoose.model('Armour', armourSchema)

module.exports = Armour
