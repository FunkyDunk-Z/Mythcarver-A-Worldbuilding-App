import { Schema, model, Types, Document } from 'mongoose'
import User from './userModel'

interface ICodex extends Document {
  createdBy: Types.ObjectId
  codexName: string
  campaigns: Types.ObjectId[]
  characters: Types.ObjectId[]
  factions: Types.ObjectId[]
  species: Types.ObjectId[]
  traits: Types.ObjectId[]
  nations: Types.ObjectId[]
  locations: Types.ObjectId[]
  settlements: Types.ObjectId[]
  items: Types.ObjectId[]
  bestairy: Types.ObjectId[]
  lore: Types.ObjectId[]
}

const codexSchema = new Schema<ICodex>({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  codexName: {
    type: String,
    required: true,
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
      ref: 'Character',
    },
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Locations',
    },
  ],
  settlements: [
    {
      type: Schema.Types.ObjectId,
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

// codexSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'characters',
//     select: '-__v ',
//   })
//   next()
// })

codexSchema.pre('save', async function (next) {
  try {
    const user = await User.findById(this.createdBy)

    if (user) {
      user.codex.push(this._id)
      await user.save()
    }

    next()
  } catch (error) {
    next()
  }
})

const Codex = model<ICodex>('Codex', codexSchema)

export default Codex
