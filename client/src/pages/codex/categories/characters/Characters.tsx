import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'

// import Sidebar from '../../../../components/layout/Sidebar'

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

  const handleToCreatePage = (option: string) => {
    navigate(`create/${option}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperBtns}>
        <MyButton handleClick={() => handleToCreatePage('player-character')}>
          Create Player Character
        </MyButton>
        <MyButton handleClick={() => handleToCreatePage('npc')}>
          Create NPC
        </MyButton>
      </div>
      <div className={styles.characterGallery}>
        {characters.map((el, i) => (
          <Card
            key={i}
            cardName={el.characterName}
            link={el._id}
            docId={el._id}
            image={el.avatarURL ? el.avatarURL : Image}
          />
        ))}
      </div>
      {/* <Sidebar /> */}
    </div>
  )
}

export default Characters
