import { useNavigate } from 'react-router-dom'

// import DefaultImage from '../../assets/D&D.jpg'

import styles from './css/Card.module.css'

type CardProps = {
  link?: string
  image?: string
  cardName: string
  docType?: string
  docSubType?: string
}

function Card({ link, image, cardName, docType, docSubType }: CardProps) {
  const navigate = useNavigate()

  const handleView = () => {
    navigate(`${link}`)
  }

  return (
    <div className={styles.wrapper} onClick={handleView}>
      {image ? (
        <img className={styles.image} src={image} alt="image of category" />
      ) : null}

      <div className={styles.cardDetails}>
        <p className={styles.cardName}>{cardName}</p>
        <p>{docType}</p>
        <p>{docSubType}</p>
      </div>
    </div>
  )
}

export default Card
