const mongoose = require('mongoose')
const User = require('./userModel')

const Schema = mongoose.Schema

const codexSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  codexName: String,
  species: [
    {
      type: Schema.ObjectId,
      ref: 'Species',
    },
  ],
  traits: [
    {
      type: Schema.ObjectId,
      ref: 'Traits',
    },
  ],
  nations: [
    {
      type: Schema.ObjectId,
      ref: 'Nations',
    },
  ],
  factions: [
    {
      type: Schema.ObjectId,
      ref: 'Factions',
    },
  ],
  characters: [
    {
      type: Schema.ObjectId,
      ref: 'Character',
    },
  ],
  locations: [
    {
      type: Schema.ObjectId,
      ref: 'Locations',
    },
  ],
  settlements: [
    {
      type: Schema.ObjectId,
      ref: 'Settlements',
    },
  ],
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Campaigns',
    },
  ],
})

codexSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'characters',
    select: '-__v ',
  })
  next()
})

codexSchema.pre('save', async function (next) {
  try {
    const user = await User.findById(this.createdBy)

    if (!user) {
      next()
    }

    user.codex.addToSet(this._id)
    await user.save()

    next()
  } catch (error) {
    next(error)
  }
})

const Codex = mongoose.model('Codex', codexSchema)

module.exports = Codex
