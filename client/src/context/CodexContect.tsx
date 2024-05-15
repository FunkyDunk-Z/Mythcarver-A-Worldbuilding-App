import { createContext, useReducer, Dispatch } from 'react'

import { codexReducer } from '../reducers/codexReducer'
import { categoryReducer } from '../reducers/categoryReducer'

const codexInit: CodexStateType = null
const categoryInit: CategoryStateType = null

type CodexContextType = {
  activeCodex: CodexStateType
  activeCategory: CategoryStateType
  dispatchCodexState: Dispatch<CodexReducerType>
  dispatchCategoryState: Dispatch<CategoryReducerType>
}

export const CodexContext = createContext<CodexContextType | null>(null)

export const CodexContextProvider = ({ children }: ReactProps) => {
  const [activeCodex, dispatchCodexState] = useReducer(codexReducer, codexInit)
  const [activeCategory, dispatchCategoryState] = useReducer(
    categoryReducer,
    categoryInit
  )

  const contextValues = {
    activeCodex,
    dispatchCodexState,
    activeCategory,
    dispatchCategoryState,
  }

  return (
    <CodexContext.Provider value={contextValues}>
      {children}
    </CodexContext.Provider>
  )
}
