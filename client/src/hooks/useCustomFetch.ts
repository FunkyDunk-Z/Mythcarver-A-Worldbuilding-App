import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios, { AxiosError, AxiosResponse } from 'axios'

interface LoginData {
  email: string
  password: string
}

interface UpdateData {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  avatarURL?: string
}

interface SignUp extends LoginData {
  firstName: string
  lastName: string
  username: string
  avatarURL: string
  passwordConfirm: string
}

type ObjectId = string

type DataType = LoginData | SignUp | UpdateData | CharacterType | ObjectId

type AuthType =
  | 'login'
  | 'signUp'
  | 'forgotPassword'
  | 'logout'
  | 'isLoggedIn'
  | 'update'

type RequestType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type PropTypes = {
  dataToSend?: DataType
  url: string
  credentials: boolean
  authType?: AuthType
  requestType: RequestType
}

export const useCustomFetch = () => {
  const { dispatchUserState, setIsLoading } = useAuthContext()
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const customFetch = async (data: PropTypes) => {
    const { dataToSend, url, credentials, authType, requestType } = data

    setError(null)
    try {
      let response: AxiosResponse

      switch (requestType) {
        case 'GET':
          response = await axios.get(`/api/v2/${url}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        case 'POST':
          response = await axios.post(`/api/v2/${url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        case 'PATCH':
          response = await axios.patch(`/api/v2/${url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        case 'DELETE':
          response = await axios.delete(`/api/v2/${url}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        default:
          throw new Error('Invalid Request Type')
      }

      if (response.status === 200) {
        const { data } = response

        if (
          authType === 'login' ||
          authType === 'signUp' ||
          authType === 'isLoggedIn' ||
          authType === 'update'
        ) {
          const { user } = data

          console.log('is logged in')

          localStorage.setItem('user', JSON.stringify(user))
          dispatchUserState({ type: 'SET_USER', payload: user })
          setIsLoading(false)
        } else if (authType === 'forgotPassword') {
          const { message } = data
          setMessage(message)
          setIsLoading(false)
        } else {
          localStorage.removeItem('user')
          dispatchUserState({ type: 'CLEAR_USER' })
          setIsLoading(false)
        }
      }

      if (response.status === 201) {
        // const { data } = response.data
        // localStorage.setItem('reload', data._id)
        setIsLoading(true)
        window.location.reload()
      } else {
        setError(response.data.error)
        setIsLoading(false)
      }

      if (response.status === 204) {
        window.location.reload()
        setIsLoading(true)
      } else {
        setError(response.data.error)
        setIsLoading(false)
      }
    } catch (error) {
      if (axios.isAxiosError<AxiosError, Record<string, unknown>>(error)) {
        if (error.response?.status === 500) {
          dispatchUserState({ type: 'CLEAR_USER' })
          localStorage.removeItem('user')
          localStorage.removeItem('reload')
          console.log("Can't connect to Server")
          setIsLoading(false)
        } else {
          dispatchUserState({ type: 'CLEAR_USER' })
          localStorage.removeItem('user')
          localStorage.removeItem('reload')
          console.log('User not loggedd in')
          setIsLoading(false)
        }
      } else {
        console.error(error)
        setIsLoading(false)
      }
    }
  }

  return { customFetch, message, error }
}
