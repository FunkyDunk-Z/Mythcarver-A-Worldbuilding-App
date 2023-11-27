import { createContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
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
        const res = await axios.post('/api/v1/users/isLoggedIn', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })

        const user = res.data.data.user

        if (res.status === 200) {
          setIsLoggedIn(true)
          localStorage.setItem('user', JSON.stringify(user))
          dispatch({ type: 'LOGIN', payload: user })
        }
      } catch (error) {
        setIsLoggedIn(false)
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('user')
        console.error('User is not logged in')
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  // console.log(
  //   // 'AuthContext state: ',
  //   state,
  //   'isLoggedIn? :',
  //   isLoggedIn,
  //   'isLoading? :',
  //   isLoading
  // )

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        isLoading,
        setIsLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
