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

type CodexType = {
  _id: string
  codexName: string
  campaigns: string[]
  characters: string[]
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

type ClearUser = {
  type: 'CLEAR_USER'
}

type TAuthReducer = SetUser | ClearUser
