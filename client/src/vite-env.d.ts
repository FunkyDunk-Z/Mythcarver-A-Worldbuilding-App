/// <reference types="vite/client" />

type ReactProps = {
  children: ReactNode
}

type InputEventType = ChangeEvent<HTMLInputElement>
type FormEventType = FormEvent<HTMLFormElement>
type MouseEventType = MouseEvent<HTMLButtonElement, MouseEvent>

interface AxiosError {
  message: string
  errors: Record<string, string[]>
}

//----------User Types----------

interface IUser {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  avatarURL: string
  codex: CodexType[]
}

type IUserState = IUser | null

type SetUser = {
  type: 'SET_USER'
  payload: IUserState
}

type RefreshUser = {
  type: 'REFRESH_USER'
  // payload: IUserState
}

type ClearUser = {
  type: 'CLEAR_USER'
}

type TAuthReducer = SetUser | ClearUser | RefreshUser

//----------Codex Types-----------

type CodexType = {
  _id: string
  createdBy: string
  codexName: string
  campaigns: string[]
  characters: CharacterType[]
  factions: string[]
  species: string[]
  traits: string[]
  nations: string[]
  locations: string[]
  settlements: string[]
  items: string[]
  bestairy: string[]
  lore: string[]
}

type SetCurrent = {
  type: 'SET_CURRENT_CODEX'
  payload: string | undefined
}

type ClearCurrent = {
  type: 'CLEAR_CURRENT_CODEX'
}

type CodexReducerType = SetCurrent | ClearCurrent

//---------Character Types----------

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

type SavingThrowType = {
  isProficient: boolean
  savingThrowMod: number
  hasAdvantage: boolean
}

type AbilityType = {
  abilityName: string
  abilityScore: number
  abilityMod?: number
  savingThrow?: SavingThrowType
}[]

type SkillType = {
  skillName: string
  skillAbility: string
  isProficient?: boolean
  hasDoubleProficiency?: boolean
  skillMod?: number
  hasAdvantage?: boolean
}[]

type SenseType = {
  senseName: string
  skillRequired: string
  senseMod?: number
  hasAdvantage?: boolean
}[]

type CharacterType = {
  _id?: string
  createdBy?: string
  codex?: string
  characterName: string
  characterType?: 'Player' | 'Npc'
  characterTitles?: string[]
  level: number
  species?: string
  class?: string
  abilities: AbilityType
  skills: SkillType
  senses: SenseType
  proficiency?: number
  initiative?: InitiativeType
  armourClass?: ArmourClassType
  healthPoints?: HealthPointsType
  speed?: SpeedType
  hasDarkvision?: boolean
}
