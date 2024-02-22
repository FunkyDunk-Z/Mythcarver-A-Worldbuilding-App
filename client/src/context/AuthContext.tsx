import { createContext, useReducer, Dispatch, useState } from 'react'

import { authReducer } from '../reducers/authReducer'

const user: IUserState = null

export const AuthContext = createContext<{
  user: IUserState
  dispatch: Dispatch<TAuthReducer>
  isLoading: boolean
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export const AuthContextProvider = ({ children }: ReactProps) => {
  const [userState, dispatch] = useReducer(authReducer, user)
  const [isLoading, setIsLoading] = useState(true)

  const contextValues = { user: userState, dispatch, isLoading, setIsLoading }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}
