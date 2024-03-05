import { useNavigate } from 'react-router-dom'

import styles from './css/Card.module.css'

type CardProps = {
  link?: string
  image: string
  cardName: string
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
  const navigate = useNavigate()

  const handleView = () => {
    if (codexId) {
      localStorage.setItem('currentCodexId', codexId)
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
        <p className={styles.characterType}>{characterType}</p>
      </div>
    </div>
  )
}

export default Card
