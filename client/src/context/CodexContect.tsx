import { createContext, useReducer, Dispatch } from 'react'

import { codexReducer } from '../reducers/codexReducer'

const codexInit: CodexType | null = null

type CodexContextType = {
  activeCodex: CodexType | null
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
