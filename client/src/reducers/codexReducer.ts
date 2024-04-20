import { Reducer } from 'react'

export const codexReducer: Reducer<CodexStateType, CodexReducerType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_CURRENT_CODEX': {
      return action.payload
    }
    case 'CLEAR_CURRENT_CODEX': {
      return null
    }
    default:
      throw new Error(`No action: ${action} ${state}`)
  }
}
