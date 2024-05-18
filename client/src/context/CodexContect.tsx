import { createContext, useReducer, Dispatch } from 'react'

import { codexReducer } from '../reducers/codexReducer'
import { categoryReducer } from '../reducers/categoryReducer'

const codexInit: CodexStateType = null
const categoryInit: CategoryStateType = null

type CodexContextType = {
  currentCodex: CodexStateType
  currentCategory: CategoryStateType
  dispatchCodexState: Dispatch<CodexReducerType>
  dispatchCategoryState: Dispatch<CategoryReducerType>
}

export const CodexContext = createContext<CodexContextType | null>(null)

export const CodexContextProvider = ({ children }: ReactProps) => {
  const [currentCodex, dispatchCodexState] = useReducer(codexReducer, codexInit)
  const [currentCategory, dispatchCategoryState] = useReducer(
    categoryReducer,
    categoryInit
  )

  const contextValues = {
    currentCodex,
    dispatchCodexState,
    currentCategory,
    dispatchCategoryState,
  }

  return (
    <CodexContext.Provider value={contextValues}>
      {children}
    </CodexContext.Provider>
  )
}
