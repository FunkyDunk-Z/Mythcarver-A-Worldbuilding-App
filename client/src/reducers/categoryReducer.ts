import { Reducer } from 'react'

export const categoryReducer: Reducer<
  CategoryStateType,
  CategoryReducerType
> = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CATEGORY': {
      return action.payload
    }
    case 'CLEAR_CURRENT_CATEGORY': {
      return null
    }
    default:
      throw new Error(`No action: ${action} ${state}`)
  }
}
