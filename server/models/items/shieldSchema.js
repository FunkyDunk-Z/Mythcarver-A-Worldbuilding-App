const mongoose = require('mongoose')
const baseItemSchema = require('./itemBaseSchema')

const shieldSchema = mongoose.Schema({
  ...baseItemSchema.obj,
  category: {
    type: String,
    enum: ['light', 'medium', 'heavy'],
    required: true,
  },
  defence: {
    baseDefence: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    additionalDefence: {
      type: Number,
    },
  },
  gearSlot: {
    type: String,
    enum: ['arm', 'hand'],
  },
})

const Shield = mongoose.model('Shield', shieldSchema)

module.exports = Shield
