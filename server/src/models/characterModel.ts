import { Schema, Types, model, Document } from 'mongoose'

import User from './userModel'
import Codex from './codexModel'

type ObjectType = { [key: string]: string }

type SavingThrowType = {
  isProficient: boolean
  savingThrowMod: number
  hasAdvantage: boolean
}

type AbilityType = {
  abilityName: string
  abilityScore: number
  abilityMod: number
  savingThrow: SavingThrowType
}

type SkillType = {
  skillName: string
  skillAbility: string
  isProficient: boolean
  hasDoubleProficiency: boolean
  skillMod: number
  hasAdvantage: boolean
}

type SenseType = {
  senseName: string
  skillRequired: string
  senseMod: number
  hasAdvantage: boolean
}

type InitiativeType = {
  initiativeScore: number
  hasAdvantage: boolean
}

type ArmourClassType = {
  baseValue: number
  armourMod: number
}

type HealthPointsType = {
  currentHP: number
  maxHP: number
  temporaryHP: number
  hitDie: number
}

type SpeedType = {
  walking: number
  swimming: number
  flying?: number
}

type AppearanceType = {
  hair?: string
  eyes?: string
  height?: string
  build?: string
  skin?: string
  scars?: string
  tattoos?: string
}

type PersonalityType = {
  ideals?: string
  flaws?: string
  likes?: string
  dislikes?: string
}

type DescriptionType = {
  appearance: AppearanceType
  personality: PersonalityType
}

type AssociationsType = {
  person?: Types.ObjectId
  relation?: string
  affinity?: string
}

interface CharacterType extends Document {
  createdBy: Types.ObjectId
  codex: Types.ObjectId
  characterName: string
  characterType: string
  characterTitles: Types.ObjectId[]
  level: number
  species: Types.ObjectId | string
  characterClass: Types.ObjectId | string
  abilities: AbilityType[]
  skills: SkillType[]
  senses: SenseType[]
  proficiency: number
  initiative: InitiativeType
  armourClass: ArmourClassType
  healthPoints: HealthPointsType
  speed: SpeedType
  hasDarkvision: boolean
  avatarURL: string
  description: DescriptionType
  associations: AssociationsType[]
}

const characterTypes = ['Player', 'Npc']

const abilityNames = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]

const skillNames = [
  'acrobatics',
  'animal handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleight of hand',
  'stealth',
  'survival',
]

const senseNames = [
  'passive perception',
  'passive insight',
  'passive investigation',
]

const characterSchema = new Schema<CharacterType>(
  {
    createdBy: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    codex: {
      type: Schema.ObjectId,
      ref: 'Codex',
    },
    characterName: {
      type: String,
      required: true,
    },
    characterType: {
      type: String,
      enum: characterTypes,
      required: true,
    },
    characterTitles: [
      {
        type: Schema.ObjectId,
        ref: 'Titles',
      },
    ],
    level: {
      type: Number,
      default: 1,
    },
    // species: {
    //   type: Schema.ObjectId,
    //   ref: 'Species',
    // },
    // class: {
    //   type: Schema.ObjectId,
    //   ref: 'Class',
    // },
    species: String,
    characterClass: String,
    abilities: [
      {
        _id: false,
        abilityName: {
          type: String,
          enum: abilityNames,
        },
        abilityScore: {
          type: Number,
          default: 10,
        },
        abilityMod: Number,
        savingThrow: {
          _id: false,
          savingThrowMod: {
            type: Number,
          },
          isProficient: {
            type: Boolean,
            default: false,
          },
          hasAdvantage: {
            type: Boolean,
            default: false,
          },
        },
      },
    ],
    skills: [
      {
        _id: false,
        skillName: {
          type: String,
          enum: skillNames,
        },
        skillAbility: {
          type: String,
          enum: abilityNames,
        },
        isProficient: {
          type: Boolean,
          default: false,
        },
        hasDoubleProficiency: {
          type: Boolean,
          default: false,
        },
        skillMod: Number,
        hasAdvantage: {
          type: Boolean,
          default: false,
        },
      },
    ],
    senses: [
      {
        _id: false,
        senseName: {
          type: String,
          enum: senseNames,
        },
        skillRequired: String,
        senseMod: Number,
        hasAdvantage: {
          type: Boolean,
          default: false,
        },
      },
    ],
    proficiency: Number,
    initiative: {
      initiativeScore: Number,
      hasAdvantage: {
        type: Boolean,
        default: false,
      },
    },
    armourClass: {
      baseValue: {
        type: Number,
        default: 0,
      },
      armourMod: {
        type: Number,
        default: 0,
      },
    },
    healthPoints: {
      currentHP: {
        type: Number,
        default: 0,
      },
      maxHP: {
        type: Number,
        default: 0,
      },
      temporaryHP: {
        type: Number,
        default: 0,
      },
      hitDie: {
        type: Number,
        default: function () {
          return this.level
        },
      },
    },
    speed: {
      walking: {
        type: Number,
        default: 30,
      },
      swimming: {
        type: Number,
        default: function () {
          return Math.floor(this.speed.walking / 2)
        },
      },
      flying: {
        type: Number,
        default: 0,
      },
    },
    hasDarkvision: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
    },
    description: {
      appearance: {
        hair: String,
        eyes: String,
        height: String,
        build: String,
        skin: String,
        scars: String,
        tattoos: String,
      },
      personality: {
        ideals: String,
        flaws: String,
        likes: String,
        dislikes: String,
      },
    },
    associations: [
      {
        person: {
          type: Schema.ObjectId,
          ref: 'Character',
        },
        relation: String,
        affinity: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

// PROFICIENCY
characterSchema.pre('save', function (next) {
  if (this.level < 5) {
    this.proficiency = 2
  } else if (this.level < 11) {
    this.proficiency = 3
  } else if (this.level < 17) {
    this.proficiency = 4
  } else {
    this.proficiency = 5
  }

  next()
})

// ABILITY SCORES
characterSchema.pre('save', function (next) {
  this.abilities.forEach((ability) => {
    const { abilityScore } = ability

    if (abilityScore > 30 || abilityScore < 0) {
      return next()
    }

    const mod = Math.floor((abilityScore - 10) / 2)

    ability.abilityMod = mod
    ability.savingThrow.savingThrowMod = mod

    if (ability.savingThrow.isProficient === true) {
      ability.savingThrow.savingThrowMod += this.proficiency
    }
  })

  next()
})

// SKILLS
characterSchema.pre('save', function (next) {
  const abilityScores = this.abilities.reduce(
    (acc: { [key: string]: number }, ability) => {
      acc[ability.abilityName] = ability.abilityMod
      return acc
    },
    {}
  )

  this.skills.forEach((skill) => {
    const abilityMod = abilityScores[skill.skillAbility]

    skill.skillMod =
      abilityMod +
      (skill.isProficient ? this.proficiency : 0) +
      (skill.hasDoubleProficiency ? this.proficiency : 0)
  })

  this.initiative.initiativeScore = abilityScores.dexterity

  next()
})

// SENSES
characterSchema.pre('save', function (next) {
  const skillMods = this.skills.reduce(
    (acc: { [key: string]: number }, skill) => {
      acc[skill.skillName] = 10 + skill.skillMod
      return acc
    },
    {}
  )

  this.senses.forEach((sense) => {
    const senseMod = skillMods[sense.skillRequired]

    sense.senseMod = senseMod
  })

  next()
})

// Armour Class
characterSchema.pre('save', function (next) {
  this.abilities.map((el) => {
    if (el.abilityName === 'dexterity') {
      this.armourClass.baseValue = el.abilityMod + 10
    }
  })

  next()
})

// HP
characterSchema.pre('save', function (next) {
  const total = this.abilities.map((el) => {
    if (el.abilityName === 'constitution') {
      const mod = el.abilityMod
      const hp = this.healthPoints.maxHP

      return mod + hp
    }
  })

  if (typeof total[2] === 'number') {
    this.healthPoints.maxHP = total[2]
  }
  next()
})

// SAVE TO USER CODEX
characterSchema.pre('save', async function (next) {
  try {
    const user = await User.findById(this.createdBy)

    if (!user) {
      next()
    }

    const codex = await Codex.findById(this.codex)

    codex?.characters.push(this._id)
    await codex?.save()

    next()
  } catch (error) {
    console.log(error)
    next()
  }
})

const Character = model<CharacterType>('Character', characterSchema)

export default Character
