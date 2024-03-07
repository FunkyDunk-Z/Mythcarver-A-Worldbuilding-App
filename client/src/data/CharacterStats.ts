export const abilitiyStats: AbilityType = [
  {
    abilityName: 'strength',
    abilityScore: 0,
  },
  {
    abilityName: 'dexterity',
    abilityScore: 0,
  },
  {
    abilityName: 'constitution',
    abilityScore: 0,
  },
  {
    abilityName: 'intelligence',
    abilityScore: 0,
  },
  {
    abilityName: 'wisdom',
    abilityScore: 0,
  },
  {
    abilityName: 'charisma',
    abilityScore: 0,
  },
]

export const skillStats: SkillType = [
  {
    skillName: 'athletics',
    skillAbility: 'strength',
  },
  {
    skillName: 'acrobatics',
    skillAbility: 'dexterity',
  },
  {
    skillName: 'sleight of hand',
    skillAbility: 'dexterity',
  },
  {
    skillName: 'stealth',
    skillAbility: 'dexterity',
  },
  {
    skillName: 'history',
    skillAbility: 'intelligence',
  },
  {
    skillName: 'investigation',
    skillAbility: 'intelligence',
  },
  {
    skillName: 'nature',
    skillAbility: 'intelligence',
  },
  {
    skillName: 'arcana',
    skillAbility: 'intelligence',
  },
  {
    skillName: 'religion',
    skillAbility: 'intelligence',
  },
  {
    skillName: 'animal handling',
    skillAbility: 'wisdom',
  },
  {
    skillName: 'insight',
    skillAbility: 'wisdom',
  },
  {
    skillName: 'medicine',
    skillAbility: 'wisdom',
  },
  {
    skillName: 'perception',
    skillAbility: 'wisdom',
  },
  {
    skillName: 'survival',
    skillAbility: 'wisdom',
  },
  {
    skillName: 'deception',
    skillAbility: 'charisma',
  },
  {
    skillName: 'intimidation',
    skillAbility: 'charisma',
  },
  {
    skillName: 'performance',
    skillAbility: 'charisma',
  },
  {
    skillName: 'persuasion',
    skillAbility: 'charisma',
  },
]

export const senseStats: SenseType = [
  {
    senseName: 'passive perception',
    skillRequired: 'perception',
  },
  {
    senseName: 'passive investigation',
    skillRequired: 'investigation',
  },
  {
    senseName: 'passive insight',
    skillRequired: 'insight',
  },
]
