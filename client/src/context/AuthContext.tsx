import {
  createContext,
  useReducer,
  Dispatch,
  useState,
  SetStateAction,
  // useMemo,
} from 'react'

import { stateReducer } from '../reducers/stateReducer'

// const getUserInit = () => {
//   try {
//     const user = localStorage.getItem('user')
//     return user ? JSON.parse(user) : null
//   } catch (error) {
//     console.error('Error parsing user from localStorage', error)
//     return null
//   }
// }

const userInit: UserStateType = null

type AuthContextType = {
  user: UserStateType | StateType
  dispatchUserState: Dispatch<ReducerType>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  error: string
  setError: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: ReactProps) => {
  // const memoInit = useMemo(() => userInit, [])
  const [user, dispatchUserState] = useReducer(stateReducer, userInit)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const contextValues = {
    user,
    dispatchUserState,
    isLoading,
    setIsLoading,
    error,
    setError,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}
