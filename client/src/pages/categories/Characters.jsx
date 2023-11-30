import styles from './css/Characters.module.css'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Card from '../../components/utils/Card'

function Characters() {
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [playerCharacters, setPlayerCharacters] = useState([])
  const [npcs, setNpcs] = useState([])

  console.log('players: ', playerCharacters, 'npcs: ', npcs)

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
          const npcArray = []
          const playerArray = []

          data.forEach((el) => {
            const { _id, characterName, level, characterType } = el
            const character = {
              id: _id,
              characterName,
              level,
              type: characterType,
            }

            if (characterType === 'player') {
              playerArray.push(character)
            } else {
              npcArray.push(character)
            }

            setNpcs(npcArray)
            setPlayerCharacters(playerArray)
          })
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
    <div className={`${styles.container} ${styles['characters']}`}>
      <h1 className={styles.header}>Player Characters</h1>
      <div className={`${styles.container} ${styles['gallery']}`}>
        {playerCharacters.map((el, i) => {
          return (
            <Card
              key={i}
              cardName={el.characterName}
              level={el.level}
              link={el.id}
              imgLink="https://picsum.photos/200/300/?random"
            />
          )
        })}
      </div>
      <h1 className={styles.header}>Npcs</h1>
      <div className={`${styles.container} ${styles['gallery']}`}>
        {npcs.map((el, i) => {
          return (
            <Card
              key={i}
              cardName={el.characterName}
              level={el.level}
              link={el.id}
              imgLink="https://picsum.photos/200/300/?random"
            />
          )
        })}
      </div>
    </div>
  )
}

export default Characters
