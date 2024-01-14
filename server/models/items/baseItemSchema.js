const mongoose = require('mongoose')

const baseItemSchema = new mongoose.Schema({
  schemaVersion: Number,
  itemName: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  isArcane: {
    type: Boolean,
    default: false,
  },
  enchantment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enchantment',
  },
  maxStackSize: {
    type: Number,
    required: true,
    default: 1,
  },
  weight: {
    type: Number,
    required: true,
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'legendary', 'mythical'],
    required: true,
  },
  quality: {
    type: String,
    enum: ['junk', 'average', 'good', 'great', 'amazing', 'perfect'],
    required: true,
  },
  baseValue: {
    type: Number,
    required: true,
  },
  isCraftable: {
    type: Boolean,
    default: false,
  },
  traits: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trait',
  },
})

module.exports = baseItemSchema
