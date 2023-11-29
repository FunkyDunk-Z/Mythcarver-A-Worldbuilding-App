import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const { dispatch, setIsLoggedIn } = useAuthContext()

  const login = async (data) => {
    setError(null)

    try {
      const response = await axios.post('/api/v1/users/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        const user = response.data.data.user

        localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'LOGIN', payload: user })
        setIsLoggedIn(true)
      } else {
        setError(response.data.error)
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return { login, error }
}
