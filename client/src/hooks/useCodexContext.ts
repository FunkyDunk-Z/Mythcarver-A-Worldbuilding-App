import { CodexContext } from '../context/CodexContect'
import { useContext } from 'react'

export const useCodexContext = () => {
  const context = useContext(CodexContext)

  if (!context) {
    throw Error('useCodexContext must be used inside an CodexContextProvider')
  }

  return context
}
