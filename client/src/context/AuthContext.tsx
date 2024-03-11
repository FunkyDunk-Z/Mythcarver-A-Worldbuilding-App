import {
  createContext,
  useReducer,
  Dispatch,
  useState,
  SetStateAction,
} from 'react'

import { stateReducer } from '../reducers/stateReducer'

const userInit: UserStateType = null

type AuthContextType = {
  user: UserStateType | StateType
  dispatchUserState: Dispatch<ReducerType>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: ReactProps) => {
  const [user, dispatchUserState] = useReducer(stateReducer, userInit)
  const [isLoading, setIsLoading] = useState(true)

  const contextValues = {
    user,
    dispatchUserState,
    isLoading,
    setIsLoading,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}
