import { useNavigate } from 'react-router-dom'

import DefaultImage from '../../assets/D&D.jpg'

import styles from './css/Card.module.css'

type CardProps = {
  link?: string
  image?: string
  cardName: string
  size?: string
}

function Card({ link, image, cardName, size }: CardProps) {
  const navigate = useNavigate()

  const handleView = () => {
    navigate(`${link}`)
  }

  return (
    <div
      className={`${styles.wrapper} ${size ? styles[size] : ''}`}
      onClick={handleView}
    >
      <img
        className={styles.image}
        src={image ? image : DefaultImage}
        alt="image of category"
      />
      <div className={styles.cardDetails}>
        <p className={styles.cardName}>{cardName}</p>
      </div>
    </div>
  )
}

export default Card
