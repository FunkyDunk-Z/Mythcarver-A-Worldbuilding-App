import { Reducer } from 'react'

export const authReducer: Reducer<IUserState, TAuthReducer> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload
    }
    case 'CLEAR_USER': {
      return null
    }
    default:
      throw new Error(`No action: ${action} ${state}`)
  }
}
