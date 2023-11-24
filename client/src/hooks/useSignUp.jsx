import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignUp = () => {
  const [myError, setMyError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signUp = async (data) => {
    setIsLoading(true)
    setMyError(null)

    try {
      const response = await axios.post('/api/v1/users/sign-up', data, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.status === 201) {
        const user = response.data.data.user

        localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'LOGIN', payload: user })
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setMyError(response.data.error.message)
      }
    } catch (error) {
      setMyError(error.response.data.message)
      setIsLoading(false)
    }
  }

  return { signUp, isLoading, myError }
}
