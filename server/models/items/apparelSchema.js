const mongoose = require('mongoose')
const baseItemSchema = require('./itemBaseSchema')

const apparelSchema = mongoose.Schema({
  ...baseItemSchema.obj,
  category: {
    type: String,
    enum: [
      'headwear',
      'upperbodyware',
      'waistware',
      'lowerbodyware',
      'footware',
      'jewlery',
      'accessories',
    ],
    required: true,
  },
  gearSlot: {
    type: String,
    enum: ['head', 'chest', 'back', 'arm', 'hand', 'waist', 'leg', 'foot'],
  },
})

const Apparel = mongoose.model('Apparel', apparelSchema)

module.exports = Apparel
