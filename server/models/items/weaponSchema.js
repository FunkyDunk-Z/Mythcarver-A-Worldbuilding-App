const mongoose = require('mongoose')
const baseItemSchema = require('./itemBaseSchema')

const damageEnum = ['1d4', '1d6', '1d8', '1d10', '1d12']

const weaponSchema = new mongoose.Schema({
  ...baseItemSchema.obj,
  category: {
    type: String,
    enum: ['melee', 'ranged', 'throwable', 'ammunition'],
    required: true,
  },
  weaponName: String,
  minRange: {
    type: Number,
    required: true,
    default: 5,
  },
  maxRange: {
    type: Number,
    required: true,
    default: 5,
  },
  damage: {
    damageType: {
      type: String,
      enum: ['bludgeoning', 'piercing', 'slashing'],
      required: true,
    },
    baseDamage: {
      type: String,
      enum: damageEnum,
      required: true,
    },
    additionalDamage: {
      quantity: {
        type: Number,
      },
      value: {
        type: String,
        enum: damageEnum,
      },
    },
  },
  gearSlot: {
    type: String,
    enum: ['one-handed', 'two-handed', 'throwable'],
    required: true,
  },
  isTwoHanded: {
    type: Boolean,
    default: false,
  },
})

const Weapon = mongoose.model('Weapon', weaponSchema)

module.exports = Weapon
