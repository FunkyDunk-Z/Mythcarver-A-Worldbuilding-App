import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const useDocFetch = () => {
  const { dispatchUserState, setIsLoading, user } = useAuthContext()
  const [error, setError] = useState(null)
  const currentCodexId = localStorage.getItem('currentCodexId')
  const currentDocId = localStorage.getItem('currentDocId')

  const createOrDelete = (
    response: AxiosResponse,
    user: UserStateType,
    currentCodexId: string,
    dispatchUserState: React.Dispatch<ReducerType>
  ) => {
    if (user) {
      const updatedUser = { ...user }
      if (updatedUser) {
        const currentCodexIndex = updatedUser.codex.findIndex(
          (el) => el?._id === currentCodexId
        )
        if (currentCodexIndex !== -1) {
          const currentCodex = updatedUser.codex[currentCodexIndex]
          if (response.status === 201) {
            const { doc } = response.data
            currentCodex.characters.push(doc)

            currentCodex.recent.push(doc)
            // must update the codex for the pushed doc to remain
            docFetch({
              requestType: 'PATCH',
              url: `/codex/${currentCodex._id}`,
              credentials: true,
              dataToSend: {
                recent: currentCodex.recent,
              },
            })
          } else if (response.status === 204) {
            const updatedCharacters = currentCodex.characters.filter(
              (char) => char._id !== currentDocId
            )
            updatedUser.codex[currentCodexIndex].characters = updatedCharacters
            localStorage.removeItem('currentDocId')
          }
        }
      }
      dispatchUserState({ type: 'SET_STATE', payload: updatedUser })
    }
  }

  const docFetch = async (data: PropTypes) => {
    const { dataToSend, url, credentials, requestType } = data
    setIsLoading(true)

    setError(null)
    try {
      let response: AxiosResponse

      switch (requestType) {
        case 'GET':
          response = await axios.get(`/api/v2/${url}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        case 'POST':
          response = await axios.post(`/api/v2/${url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        case 'PATCH':
          response = await axios.patch(`/api/v2/${url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        case 'DELETE':
          response = await axios.delete(`/api/v2/${url}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: credentials,
          })
          break
        default:
          throw new Error('Invalid Request Type')
      }

      //---------- GET ----------
      if (response.status === 200) {
        const { data } = response
        console.log(data)

        setIsLoading(false)
      } else {
        setIsLoading(false)
      }

      if (response.status === 201 || response.status === 204) {
        if (currentCodexId)
          createOrDelete(response, user, currentCodexId, dispatchUserState)
      }
    } catch (error) {
      if (axios.isAxiosError<AxiosError, Record<string, unknown>>(error)) {
        if (error.response?.status === 500) {
          dispatchUserState({ type: 'CLEAR_STATE' })
          localStorage.clear()
          console.log("Can't connect to Server")
          setIsLoading(false)
        } else {
          dispatchUserState({ type: 'CLEAR_STATE' })
          localStorage.clear()
          console.log('User not loggedd in')
          setIsLoading(false)
        }
      } else {
        console.error(error)
        setIsLoading(false)
      }
    }
  }

  return { docFetch, error }
}
