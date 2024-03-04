import { createContext, useReducer, Dispatch, useState } from 'react'

import { authReducer } from '../reducers/authReducer'
import { currentCodexReducer } from '../reducers/currentCodexReducer'

const user: IUserState = null
const currentCodex: CodexIDType = null

export const AuthContext = createContext<{
  user: IUserState
  dispatchUserState: Dispatch<TAuthReducer>
  isLoading: boolean
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
  currentCodexId: CodexIDType
  dispatchCurrentCodexId: Dispatch<CodexReducerType>
} | null>(null)

export const AuthContextProvider = ({ children }: ReactProps) => {
  const [userState, dispatchUserState] = useReducer(authReducer, user)
  const [currentCodexId, dispatchCurrentCodexId] = useReducer(
    currentCodexReducer,
    currentCodex
  )
  const [isLoading, setIsLoading] = useState(true)

  const contextValues = {
    user: userState,
    dispatchUserState,
    isLoading,
    setIsLoading,
    currentCodexId,
    dispatchCurrentCodexId,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}
