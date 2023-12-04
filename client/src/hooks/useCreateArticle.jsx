import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useCreateArticle = () => {
  const [myError, setMyError] = useState(null)
  const { dispatch } = useAuthContext()

  const createNew = async (data, fetchPath) => {
    setMyError(null)

    try {
      const response = await axios.post(`api/v1/${fetchPath}`, data, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.status === 201) {
        const data = response.data.data
        console.log(data)

        // localStorage.setItem('user', JSON.stringify(user))
        // dispatch({ type: 'LOGIN', payload: user })
      } else {
        setMyError(response.data.error.message)
      }
    } catch (error) {
      setMyError(error.response.data.message)
    }
  }

  return { createNew, myError }
}
