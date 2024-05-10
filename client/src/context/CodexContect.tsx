import { createContext, useReducer, Dispatch } from 'react'

import { codexReducer } from '../reducers/codexReducer'

const codexInit: CodexStateType = null

type CodexContextType = {
  activeCodex: CodexStateType | CodexType
  dispatchCodexState: Dispatch<CodexReducerType>
}

export const CodexContext = createContext<CodexContextType | null>(null)

export const CodexContextProvider = ({ children }: ReactProps) => {
  const [activeCodex, dispatchCodexState] = useReducer(codexReducer, codexInit)

  const contextValues = {
    activeCodex,
    dispatchCodexState,
  }

  return (
    <CodexContext.Provider value={contextValues}>
      {children}
    </CodexContext.Provider>
  )
}
