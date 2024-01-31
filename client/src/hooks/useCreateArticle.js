import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useCreateArticle = () => {
  const [articleError, setArticleError] = useState(null)
  const { dispatch, isLoading } = useAuthContext()

  const createNew = async (data, fetchPath) => {
    setArticleError(null)

    try {
      const response = await axios.post(`/api/v1/${fetchPath}`, data, {
        headers: { 'Content-Type': 'application/json' },
      })

      console.log(response)

      if (response.status === 201) {
        const data = response.data.data
        // console.log('resData:', data)

        // localStorage.setItem('user', JSON.stringify(user))
        // dispatch({ type: 'LOGIN', payload: user })
      } else {
        setArticleError(response.data.error.message)
      }
    } catch (error) {
      setArticleError(error.response.data.message)
    }
  }

  return { createNew, articleError, isLoading }
}
