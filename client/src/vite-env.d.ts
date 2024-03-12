/// <reference types="vite/client" />

type ReactProps = {
  children: ReactNode
}

type InputEventType = ChangeEvent<HTMLInputElement>
type FormEventType = FormEvent<HTMLFormElement>
type MouseEventType = MouseEvent<HTMLButtonElement, MouseEvent>

//---------- Axios Types ----------

interface AxiosError {
  message: string
  errors: Record<string, string[]>
}

interface LoginData {
  email: string
  password: string
}

interface UpdateData {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  avatarURL?: string
}

interface SignUpData extends LoginData {
  firstName: string
  lastName: string
  username: string
  avatarURL: string
  passwordConfirm: string
}

type DataType = LoginData | SignUpData | UpdateData | CharacterType

type AuthType =
  | 'login'
  | 'signUp'
  | 'forgotPassword'
  | 'logout'
  | 'isLoggedIn'
  | 'update'

type RequestType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type PropTypes = {
  dataToSend?: DataType
  url: string
  credentials: boolean
  authType?: AuthType
  requestType: RequestType
}

//----------User Types----------

interface UserType {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  avatarURL: string
  codex: CodexType[]
}

type UserStateType = UserType | null

type SetUser = {
  type: 'SET_USER'
  payload: UserType
}

type ClearUser = {
  type: 'CLEAR_USER'
}

type AuthReducerType = SetUser | ClearUser

//----------Codex Types-----------

interface CodexType {
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

type CodexStateType = CodexType | null

type SetCodex = {
  type: 'SET_CURRENT_CODEX'
  payload: CodexType
}

type ClearCodex = {
  type: 'CLEAR_CURRENT_CODEX'
}

type CodexReducerType = SetCodex | ClearCodex

//---------Character Types----------

type InitiativeType = {
  initiativeScore: number
  hasAdvantage?: boolean
}

type ArmourClassType = {
  baseValue: number
  armourMod: number
}

type HealthPointsType = {
  currentHP?: number
  maxHP: number
  temporaryHP?: number
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

interface CharacterType {
  _id?: string
  createdBy?: string
  codex?: string | null
  characterName: string
  characterPortrait?: string
  characterType?: string
  characterTitles?: string[]
  level: number
  species?: string
  characterClass?: string
  abilities: AbilityType
  skills: SkillType
  senses: SenseType
  proficiency?: number
  initiative?: InitiativeType
  armourClass?: ArmourClassType
  healthPoints: HealthPointsType
  speed?: SpeedType
  hasDarkvision?: boolean
}

// type CharacterStateType = CharacterType | null

//----------- Reducer Types -----------

type StateType = UserStateType

type SetState = {
  type: 'SET_STATE'
  payload: StateType
}

type ClearState = {
  type: 'CLEAR_STATE'
}

type ReducerType = SetState | ClearState
