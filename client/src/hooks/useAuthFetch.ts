import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useCodexContext } from './useCodexContext'

import axios, { AxiosError, AxiosResponse } from 'axios'

export const useAuthFetch = () => {
  const { dispatchUserState, setIsLoading } = useAuthContext()
  const { dispatchCodexState, dispatchCategoryState } = useCodexContext()
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const authFetch = async (data: FetchPropTypes) => {
    const { dataToSend, url, authType, requestType } = data

    setError(null)
    try {
      let response: AxiosResponse

      switch (requestType) {
        case 'GET':
          response = await axios.get(`/api/v2/${url}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          break
        case 'POST':
          response = await axios.post(`/api/v2/${url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          break
        case 'PATCH':
          response = await axios.patch(`/api/v2/${url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          break
        case 'DELETE':
          response = await axios.delete(`/api/v2/${url}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          break
        default:
          throw new Error('Invalid Request Type')
      }

      //If login/isloggedin/update user is a success
      if (response.status === 200) {
        const { data } = response

        if (
          authType === 'login' ||
          authType === 'isLoggedIn' ||
          authType === 'update'
        ) {
          const { user } = data
          dispatchUserState({ type: 'SET_STATE', payload: user })

          const currentCodex = user.codex.filter(
            (el: CodexType) => el.isCurrent === true
          )
          const currentCategory = currentCodex[0].categories.filter(
            (el: CategoryType) => el.isCurrent === true
          )

          dispatchCodexState({
            type: 'SET_CURRENT_CODEX',
            payload: currentCodex[0],
          })

          dispatchCategoryState({
            type: 'SET_CURRENT_CATEGORY',
            payload: currentCategory[0],
          })

          setIsLoading(false)
        } else if (authType === 'forgotPassword') {
          const { message } = data
          setMessage(message)
          setIsLoading(false)
        } else {
          dispatchUserState({ type: 'CLEAR_STATE' })
          setIsLoading(false)
        }
      }

      // If signUp is a success
      if (response.status === 201) {
        const { user } = response.data
        dispatchUserState({ type: 'SET_STATE', payload: user })
        setIsLoading(false)
      } else {
        setError(response.data.error)
        setIsLoading(false)
      }

      // If delete user is a success
      if (response.status === 204) {
        setIsLoading(true)
      } else {
        setError(response.data.error)
        setIsLoading(false)
      }
    } catch (error) {
      if (axios.isAxiosError<AxiosError, Record<string, unknown>>(error)) {
        if (error.response?.status === 500) {
          dispatchUserState({ type: 'CLEAR_STATE' })
          console.log("Can't connect to Server")
          setIsLoading(false)
        } else {
          dispatchUserState({ type: 'CLEAR_STATE' })
          console.log('User not loggedd in')
          setIsLoading(false)
        }
      } else {
        console.error(error)
        setIsLoading(false)
      }
    }
  }

  return { authFetch, message, error }
}
