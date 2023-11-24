const mongoose = require('mongoose')

const Schema = mongoose.Schema

const codexSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  species: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Species',
    },
  ],
  traits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Traits',
    },
  ],
  nations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Nations',
    },
  ],
  factions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Factions',
    },
  ],
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Characters',
    },
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Locations',
    },
  ],
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Campaigns',
    },
  ],
})

// codexSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'species',
//     select: '-__v ',
//   })
//   next()
// })

const Codex = mongoose.model('Codex', codexSchema)

module.exports = Codex
