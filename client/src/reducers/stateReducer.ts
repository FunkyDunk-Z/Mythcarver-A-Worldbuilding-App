import { Reducer } from 'react'

export const stateReducer: Reducer<StateType, ReducerType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_STATE': {
      return action.payload
    }
    case 'CLEAR_STATE': {
      return null
    }
    default:
      throw new Error(`No action: ${action} ${state}`)
  }
}
