import { useAuthContext } from './useAuthContext'
import { useCodexContext } from './useCodexContext'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const useDocFetch = () => {
  const { user } = useAuthContext()
  const { dispatchCodexState, activeCodex } = useCodexContext()

  const docFetch = async (data: FetchPropTypes) => {
    {
      const { dataToSend, url, requestType } = data

      if (!activeCodex || !user) {
        return new Error('no user or active codex')
      }
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
        if (response.status === 200 || response.status === 204) {
          const { doc } = response.data

          return doc
        }

        //---------- CREATE ----------
        if (response.status === 201) {
          const { doc } = response.data

          const {
            docType,
            thumbnail,
            docName,
            docSubType,
            categoryUrl,
            categoryId,
          } = doc.commonProps

          const docToAdd = {
            docId: doc._id,
            modelRef: docType,
            thumbnail,
            docName,
            docType,
            docSubType,
            categoryUrl,
          }

          activeCodex.recent.push(docToAdd)
          activeCodex.categories.map((el) => {
            if (el._id.toString() === categoryId.toString()) {
              el.docs.push(docToAdd)
            }
          })
          dispatchCodexState({
            type: 'SET_CURRENT_CODEX',
            payload: activeCodex,
          })
        }
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
