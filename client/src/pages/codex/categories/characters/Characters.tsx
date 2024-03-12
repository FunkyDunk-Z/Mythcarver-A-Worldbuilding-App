import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'

import Card from '../../../../components/utils/Card'
import MyButton from '../../../../components/utils/MyButton'
import Image from '../../../../assets/D&D.jpg'

import styles from './css/Characters.module.css'

function Characters() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const currentCodexId = localStorage.getItem('currentCodexId')
  const [characters, setCharacters] = useState<CharacterType[]>([])

  useEffect(() => {
    if (user) {
      const currentCodex = user.codex.find(
        (codex) => codex._id === currentCodexId
      )
      if (currentCodex) {
        setCharacters(currentCodex.characters)
      }
    }
  }, [user, currentCodexId])

  const handleToCreatePage = () => {
    navigate('create')
  }

  return (
    <div className={styles.wrapper}>
      <MyButton handleClick={handleToCreatePage}>Create</MyButton>
      <div className={styles.characterGallery}>
        {characters.map((el, i) => (
          <Card
            key={i}
            cardName={el.characterName}
            characterType={el.characterType}
            link={el._id}
            docId={el._id}
            image={Image}
          />
        ))}
      </div>
    </div>
  )
}

export default Characters
