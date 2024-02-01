import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogout = () => {
  const { dispatch, setIsLoggedIn } = useAuthContext()

  const logout = async () => {
    try {
      const response = await axios.post('/api/v1/users/logout')

      if (response.status === 200) {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { logout }
}
