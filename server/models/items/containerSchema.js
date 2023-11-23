const mongoose = require('mongoose')
const baseItemSchema = require('./itemBaseSchema')

const containerEnum = ['pouch', 'backpack', 'chest', 'safe', 'industrial']
const refModelEnum = [
  'Weapon',
  'Shield',
  'Armour',
  'Apparel',
  'Resource',
  'Material',
  'Component',
  'Miscellaneous',
  'Alchemy',
  'Tool',
]

const containerSchema = mongoose.Schema({
  ...baseItemSchema.obj,
  category: {
    type: String,
    enum: containerEnum,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  currentCapacity: {
    type: Number,
    default: 0,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'refModel',
    },
  ],
  refModel: {
    type: String,
    enum: refModelEnum,
    required: true,
  },
})

const Container = mongoose.model('Container', containerSchema)

module.exports = Container
