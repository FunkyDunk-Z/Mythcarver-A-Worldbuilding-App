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

type DataType =
  | LoginData
  | SignUpData
  | UpdateData
  | CharacterType
  | RecentType
  | CodexType

type AuthType =
  | 'login'
  | 'signUp'
  | 'forgotPassword'
  | 'logout'
  | 'isLoggedIn'
  | 'update'

type RequestType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type FetchPropTypes = {
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
  docId: Types.ObjectId
  thumbnail: string
  docName: string
  docType: string
  docSubType?: string
  categoryUrl: string
}

interface CommonSchemaType {
  createdBy: Types.ObjectId
  codexId: Types.ObjectId
  isPublic: boolean
  docName: string
  docType: string
  docSubType?: string
  categoryId: Types.ObjectId
  modelRef: string
  connections: Types.ObjectId[]
  thumbnail: string
}

interface CategoryType {
  _id: string
  createdBy: Types.ObjectId
  categoryName: string
  categoryUrl: string
  docs: DocType[]
  thumbnail: string
}

interface CodexDocument {
  _id: string
  createdBy: Types.ObjectId
  codexName: string
  codexUrl: string
  recent: DocType[]
  isCurrent: boolean
  categories: Types.ObjectId[]
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

interface SavingThrowType {
  isProficient: boolean
  savingThrowMod: number
  hasAdvantage: boolean
}

interface AbilityType {
  abilityName: string
  abilityScore: number
  abilityMod: number
  savingThrow: SavingThrowType
}

interface SkillType {
  skillName: string
  skillAbility: string
  isProficient: boolean
  hasDoubleProficiency: boolean
  skillMod: number
  hasAdvantage: boolean
}

interface SenseType {
  senseName: string
  skillRequired: string
  senseMod: number
  hasAdvantage: boolean
}

interface InitiativeType {
  initiativeScore: number
  hasAdvantage: boolean
}

interface ArmourClassType {
  baseValue: number
  armourMod: number
}

interface HealthPointsType {
  currentHP: number
  maxHP: number
  temporaryHP: number
  hitDie: number
}

interface SpeedType {
  walking: number
  swimming: number
  flying?: number
}

interface AppearanceType {
  hair?: string
  eyes?: string
  height?: string
  build?: string
  skin?: string
  scars?: string
  tattoos?: string
}

interface PersonalityType {
  ideals?: string
  flaws?: string
  likes?: string
  dislikes?: string
}

interface DescriptionType {
  appearance: AppearanceType
  personality: PersonalityType
}

interface AssociationsType {
  person?: Types.ObjectId
  relation?: string
  affinity?: string
}

interface CharacterType extends CommonSchemaType {
  commonProps: CommonSchemaType
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
