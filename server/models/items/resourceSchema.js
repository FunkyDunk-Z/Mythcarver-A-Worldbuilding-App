const mongoose = require('mongoose')
const baseItemSchema = require('./itemBaseSchema')

const rng = (min, max) => {
  const minimum = Math.ceil(min)
  const maximum = Math.floor(max)
  return Math.floor(Math.random() * (maximum - minimum) + minimum)
}

const resourceTypeEnum = [
  'creature part',
  'flora',
  'fungi',
  'metal',
  'mineral',
  'lumber',
]

const skills = ['gathering', 'harvesting', 'hunting', 'mining', 'woodcutting']

const resourceSchema = new mongoose.Schema(
  {
    ...baseItemSchema.obj,
    category: {
      type: String,
      enum: resourceTypeEnum,
      required: true,
    },
    qualityScore: {
      type: Number,
    },
    resourceCount: {
      type: Number,
      default: 1,
    },
    skillRequired: {
      type: String,
      enum: skills,
      required: true,
    },
    obtainDC: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

resourceSchema.pre('save', function (next) {
  switch (this.rarity) {
    case 'common':
      this.obtainDC = 10
      break
    case 'uncommon':
      this.obtainDC = 15
      break
    case 'rare':
      this.obtainDC = 20
      break
    case 'legendary':
      this.obtainDC = 25
      break
    case 'mythical':
      this.obtainDC = 30
      break
    default:
      return next()
  }
  next()
})

resourceSchema.pre('save', function (next) {
  switch (this.quality) {
    case 'junk':
      this.qualityScore = rng(1, 36)
      break
    case 'average':
      this.qualityScore = rng(36, 322)
      break
    case 'good':
      this.qualityScore = rng(322, 423)
      break
    case 'great':
      this.qualityScore = rng(423, 474)
      break
    case 'amazing':
      this.qualityScore = rng(474, 500)
      break
    case 'perfect':
      this.qualityScore = 500
      break
    default:
      return next()
  }
  next()
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
