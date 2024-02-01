import { useState } from 'react'
import axios from 'axios'

export const useForgotPassword = () => {
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const forgotPassword = async (data) => {
    setError(null)

    try {
      const response = await axios.post('/api/v1/users/forgot-password', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        const message = response.data.message
        setMessage(message)
      } else {
        setError(response.data.error)
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return { forgotPassword, error, message }
}
