import { useAuthContext } from '../../../hooks/useAuthContext'

import Card from '../../../components/utils/Card'
import Image from '../../../assets/PlaceholderPortrait.png'

import styles from './css/Characters.module.css'

function Characters() {
  const { user } = useAuthContext()
  const url = window.location.href.split('/')[4]
  const characters = user?.codex.filter((el) => url === el._id)[0].characters

  const handleCreate = () => {
    console.log('click')
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCreate}>Create Character</button>
      <div className={styles.characterGallery}>
        {characters
          ? characters.map((el, i) => {
              return (
                <Card
                  key={i}
                  cardName={el.characterName}
                  link={el._id}
                  image={Image}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

export default Characters
