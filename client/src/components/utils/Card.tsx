import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

import styles from './css/Card.module.css'

type CardProps = {
  link?: string
  image: string
  cardName?: string
  codexId?: string
  docId?: string
  characterType?: string
}

function Card({
  link,
  image,
  cardName,
  codexId,
  docId,
  characterType,
}: CardProps) {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleView = () => {
    if (codexId) {
      const currentCodex = user?.codex.find((codex) => codex._id === codexId)
      if (currentCodex) {
        localStorage.setItem('currentCodexId', codexId)
      }
    }
    if (docId) {
      localStorage.setItem('currentDocId', docId)
    }
    const linkUrl = link?.replace(/\s/g, '-').toLowerCase()

    if (linkUrl) {
      navigate(linkUrl)
    }
  }

  return (
    <div className={styles.wrapper} onClick={handleView}>
      <img className={styles.image} src={image} alt="image of category" />
      <div className={styles.cardDetails}>
        <p className={styles.cardName}>{cardName}</p>
        {characterType ? (
          <p className={styles.characterType}>{characterType}</p>
        ) : null}
      </div>
    </div>
  )
}

export default Card
