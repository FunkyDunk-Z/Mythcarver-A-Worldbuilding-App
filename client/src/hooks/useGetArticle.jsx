import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useGetArticle = () => {
  const [myError, setMyError] = useState(null)
  const { dispatch, isLoading } = useAuthContext()

  const getArticle = async (data, fetchPath) => {
    setMyError(null)
    console.log(data, fetchPath)

    try {
      const response = await axios.get(`/api/v1/${fetchPath}`, data, {
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

  return { getArticle, myError, isLoading }
}
