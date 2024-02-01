import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useUpdateAccount = () => {
  const [accountError, setAccountError] = useState(null)
  const { dispatch } = useAuthContext()

  const updateAccount = async (data) => {
    setAccountError(null)

    try {
      const response = await axios.patch(
        '/api/v1/users/update-my-account',
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (response.status === 200) {
        const { user } = response.data
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'UPDATE_USER', payload: user })
      } else {
        setAccountError(response)
      }
    } catch (error) {
      setAccountError(error.response)
    }
  }

  return { updateAccount, accountError }
}
