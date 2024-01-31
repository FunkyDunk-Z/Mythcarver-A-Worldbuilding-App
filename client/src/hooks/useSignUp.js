import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignUp = () => {
  const [myError, setMyError] = useState(null)
  const { dispatch, setIsLoggedIn } = useAuthContext()

  const signUp = async (data) => {
    setMyError(null)

    try {
      const response = await axios.post('/api/v1/users/sign-up', data, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.status === 201) {
        const user = response.data.user

        localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'LOGIN', payload: user })
        setIsLoggedIn(true)
      } else {
        setMyError(response.data.error.message)
      }
    } catch (error) {
      setMyError(error.response.data.message)
    }
  }

  return { signUp, myError }
}
