import { createContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE_USER':
      return { user: { ...action.payload } }
    default:
      throw new Error(`No action type: ${action.type}`)
  }
}

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { status, data } = await axios.post('/api/v1/users/isLoggedIn', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })

        const { user } = data

        if (status === 200) {
          setIsLoggedIn(true)
          localStorage.setItem('user', JSON.stringify(user))
          dispatch({ type: 'LOGIN', payload: user })
        }
      } catch (error) {
        setIsLoggedIn(false)
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('user')
        if (error.response.status === 500) {
          localStorage.setItem('user', JSON.stringify(offlineUser))
          console.log('Server Error')
        }
        console.error('User is not logged in')
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  const values = {
    ...state,
    dispatch,
    isLoading,
    setIsLoggedIn,
    isLoggedIn,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
