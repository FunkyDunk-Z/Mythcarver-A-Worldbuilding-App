import { createContext, useReducer, Dispatch } from 'react'

import { codexReducer } from '../reducers/codexReducer'

const codexInit: CodexStateType = null

type CodexContextType = {
  codex: CodexStateType | CodexType
  dispatchCodexState: Dispatch<CodexReducerType>
}

export const CodexContext = createContext<CodexContextType | null>(null)

export const CodexContextProvider = ({ children }: ReactProps) => {
  const [codex, dispatchCodexState] = useReducer(codexReducer, codexInit)

  const contextValues = {
    codex,
    dispatchCodexState,
  }

  return (
    <CodexContext.Provider value={contextValues}>
      {children}
    </CodexContext.Provider>
  )
}
