import styles from './css/Characters.module.css'
import Gallery from '../../components/layout/Gallery'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Characters() {
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [characters, setCharacters] = useState()

  console.log(characters)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/characters', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.status === 200) {
          const data = res.data.data
          setCharacters(data)
        } else {
          setError(response.data.error)
        }
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={` ${styles.container} ${styles['characters']}`}>
      <h1 className={styles.header}>Player Characters</h1>
      <Gallery />
      <h1 className={styles.header}>Npc's</h1>
      <Gallery />
    </div>
  )
}

export default Characters
