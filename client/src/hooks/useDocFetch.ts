import { useAuthContext } from './useAuthContext'
import { useCodexContext } from './useCodexContext'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const useDocFetch = () => {
  const { user } = useAuthContext()
  const { dispatchCodexState, currentCodex } = useCodexContext()

  const docFetch = async (data: FetchPropTypes) => {
    {
      const { dataToSend, url, requestType } = data

      if (!currentCodex || !user) {
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
          if (response.data.doc) {
            const { doc } = response.data

            return doc
          } else {
            const { docs } = response.data

            return docs
          }
        }

        //---------- CREATE ----------
        if (response.status === 201) {
          const { doc } = response.data

          if (doc.commonProps) {
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

            currentCodex.recent.push(docToAdd)
            currentCodex.categories.map((el) => {
              if (el._id.toString() === categoryId.toString()) {
                el.docs.push(docToAdd)
              }
            })
          }
          dispatchCodexState({
            type: 'SET_CURRENT_CODEX',
            payload: currentCodex,
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
