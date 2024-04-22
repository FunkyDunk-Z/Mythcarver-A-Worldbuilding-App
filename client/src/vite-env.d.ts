/// <reference types="vite/client" />

type ObjectType = { [key: string]: string }

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

interface RecentType {
  recent: CharacterType[]
}

type DataType = LoginData | SignUpData | UpdateData | CharacterType | RecentType

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

interface DocType {
  doc: string
  docName: string
  docType: string
  refModel: string
}

interface CategoryType {
  categoryName: string
  categoryUrl: string
  docs: DocType[]
}

interface CodexType {
  _id: string
  isCurrent: boolean
  createdBy: string
  codexName: string
  codexUrl: string
  categories: CategoryType[]
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
  recent: CharacterType[]
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
  hitDie?: number
}

type SpeedType = {
  walking: number
  swimming: number
  flying?: number
}

type SavingThrowType = {
  isProficient?: boolean
  savingThrowMod: number
  hasAdvantage?: boolean
}

type AbilityType = {
  abilityName: string
  abilityScore?: number
  abilityMod?: number
  savingThrow?: SavingThrowType
}

type SkillType = {
  skillName: string
  skillAbility: string
  isProficient?: boolean
  hasDoubleProficiency?: boolean
  skillMod: number
  hasAdvantage?: boolean
}[]

type SenseType = {
  senseName: string
  skillRequired: string
  senseMod?: number
  hasAdvantage?: boolean
}[]

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
  appearance?: AppearanceType
  personality?: PersonalityType
}

type AssociationsType = {
  person?: string
  relation?: string
  affinity?: string
}

interface CharacterType {
  _id?: string
  createdBy?: string
  codex?: string | null
  characterName: string
  avatarURL?: string
  characterType?: string
  characterTitles?: string[]
  level: string | undefined
  species?: string
  characterClass?: string
  abilities: AbilityType[]
  skills: SkillType
  senses: SenseType
  proficiency?: number
  initiative?: InitiativeType
  armourClass?: ArmourClassType
  healthPoints: HealthPointsType
  speed?: SpeedType
  hasDarkvision?: boolean
  description: DescriptionType
  associations?: AssociationsType[]
}

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
