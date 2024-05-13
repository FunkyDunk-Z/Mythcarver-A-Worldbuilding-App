import { Reducer } from 'react'

export const currentDocReducer: Reducer<
  CharacterType | null,
  CurrentDocReducerType
> = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DOC': {
      return action.payload
    }
    case 'CLEAR_CURRENT_DOC': {
      return null
    }
    default:
      throw new Error(`No action: ${action} ${state}`)
  }
}
