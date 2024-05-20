import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useCodexContext } from './useCodexContext'

import axios, { AxiosError, AxiosResponse } from 'axios'

export const useAuthFetch = () => {
  const { dispatchUserState, setError, setIsLoading } = useAuthContext()
  const { dispatchCodexState, dispatchCategoryState } = useCodexContext()
  const [message, setMessage] = useState('')

  const authFetch = async (data: FetchPropTypes) => {
    const { dataToSend, url, authType, requestType } = data
    setIsLoading(true)
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

          localStorage.setItem('user', JSON.stringify(user))

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
        } else if (authType === 'forgotPassword') {
          const { message } = data
          setMessage(message)
        } else {
          dispatchUserState({ type: 'CLEAR_STATE' })
        }
      }

      // If signUp is a success
      if (response.status === 201) {
        const { user } = response.data
        dispatchUserState({ type: 'SET_STATE', payload: user })
      } else {
        setError(response.data.error)
      }

      // If delete user is a success
      if (response.status === 204) {
        console.log('deletion success')
      } else {
        setError(response.data.error)
      }
    } catch (error) {
      if (
        axios.isAxiosError<AxiosError, Record<string, unknown>>(error) &&
        error.response
      ) {
        const { status, data } = error.response
        const { message } = data
        localStorage.clear()
        if (status === 500) {
          setError('Server down. Please try again later')
        } else if (status === 401) {
          setError('')
        } else {
          setError(message)
        }
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { authFetch, message }
}
