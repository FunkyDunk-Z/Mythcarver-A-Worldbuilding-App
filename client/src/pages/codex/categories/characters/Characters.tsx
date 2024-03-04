import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'

import Card from '../../../../components/utils/Card'
import Image from '../../../../assets/PlaceholderPortrait.png'

import styles from './css/Characters.module.css'

function Characters() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const currentCodexId = localStorage.getItem('currentCodexId')
  const currentCodex = user?.codex.find((codex) => codex._id === currentCodexId)

  const handleCreate = () => {
    navigate('create')
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCreate}>Create Character</button>
      <div className={styles.characterGallery}>
        {currentCodex
          ? currentCodex.characters?.map((el, i) => {
              return (
                <Card
                  key={i}
                  cardName={el.characterName}
                  characterType={el.characterType}
                  link={el._id}
                  image={Image}
                  objectId={el._id}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

export default Characters
