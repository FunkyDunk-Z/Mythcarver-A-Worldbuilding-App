import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useCodexContext } from '../../../../hooks/useCodexContext'

// import Sidebar from '../../../../components/layout/Sidebar'

import Card from '../../../../components/utils/Card'
import MyButton from '../../../../components/utils/MyButton'
import Image from '../../../../assets/D&D.jpg'

import styles from './css/Characters.module.css'

function Characters() {
  const { user } = useAuthContext()
  const { currentCodex } = useCodexContext()
  const navigate = useNavigate()
  const [characters, setCharacters] = useState<DocType[] | null>([])

  useEffect(() => {
    if (user) {
      if (currentCodex) {
        const characterArray = currentCodex.categories.map((el) =>
          el.categoryName === 'Characters' ? el.docs : null
        )

        if (characterArray) {
          characterArray.map((el) => setCharacters(el))
        }

        // setCharacters(currentCodex.categories.map((el) => el.categoryName === "Characters" ? ))
      }
    }
  }, [user, currentCodex])

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
        {characters?.map((el, i) => (
          <Card
            key={i}
            cardName={el.docName}
            link={el.docId}
            docType={el.docType}
            docSubType={el.docSubType}
            image={el.thumbnail ? el.thumbnail : Image}
          />
        ))}
      </div>
      {/* <Sidebar /> */}
    </div>
  )
}

export default Characters
