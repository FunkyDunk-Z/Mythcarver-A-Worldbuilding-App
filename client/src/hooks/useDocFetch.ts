// import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'
// import { useCodexContext } from './useCodexContext'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const useDocFetch = () => {
  // const { dispatchUserState, setIsLoading } = useAuthContext()
  // const { dispatchCodexState, activeCodex } = useCodexContext()
  // const [error, setError] = useState(null)

  // const createOrDelete = (
  //   response: AxiosResponse,
  //   user: UserStateType,
  //   codexId: string,
  //   dispatchUserState: React.Dispatch<ReducerType>
  // ) => {
  //   if (user && activeCodex) {
  //         if (response.status === 201) {
  //           const { doc } = response.data
  //           activeCodex.categories.map((el) => el._id === doc.categoryId).push(doc)

  //           currentCodex.recent.push(doc)
  //           // must update the codex for the pushed doc to remain
  //           docFetch({
  //             requestType: 'PATCH',
  //             url: `/codex/${activeCodex._id}`,
  //             credentials: true,
  //             dataToSend: {
  //               recent: activeCodex.recent,
  //             },
  //           })
  //         } else if (response.status === 204) {
  //           const updatedCharacters = currentCodex.characters.filter(
  //             (char) => char._id !== currentDocId
  //           )
  //           currentUser.codex[currentCodexIndex].characters = updatedCharacters
  //         }
  //       }
  //     }
  //     dispatchUserState({ type: 'SET_STATE', payload: user })
  //   }

  const docFetch = async (data: FetchPropTypes) => {
    {
      const { dataToSend, url, requestType } = data
      try {
        let response: AxiosResponse

        switch (requestType) {
          case 'GET':
            response = await axios.get(`/api/v2/${url}`, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            })
            break
          case 'POST':
            response = await axios.post(`/api/v2/${url}`, dataToSend, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            })
            break
          case 'PATCH':
            response = await axios.patch(`/api/v2/${url}`, dataToSend, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            })
            break
          case 'DELETE':
            response = await axios.delete(`/api/v2/${url}`, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            })
            break
          default:
            throw new Error('Invalid Request Type')
        }

        //---------- GET & PATCH ----------
        if (response.status === 200) {
          const { data } = response
          const { doc } = data

          return doc
        }

        //---------- CREATE & DELETE ----------

        // if (response.status === 201 || response.status === 204) {
        //     // createOrDelete(response, user, activeCodex._id, dispatchUserState)
        //     // createdOrDeleted = (
        //     //     response: AxiosResponse,
        //     //     user: UserStateType,
        //     //     codexId: string,
        //     //     dispatchUserState: React.Dispatch<ReducerType>
        //     //   ) => {

        //     //   }
        // }
      } catch (error) {
        if (axios.isAxiosError<AxiosError, Record<string, unknown>>(error)) {
          if (error.response?.status === 500) {
            console.log("Can't connect to Server")
          } else {
            console.log('User not loggedd in')
          }
        } else {
          console.error(error)
        }
      }
    }
  }
  return { docFetch }
}
