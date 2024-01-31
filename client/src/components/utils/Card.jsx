import { useNavigate } from 'react-router-dom'

import styles from './css/Card.module.css'

function Card({ link, imgLink, cardName }) {
  const navigate = useNavigate()
  const handleClick = () => {
    return navigate(`${link}`)
  }

  return (
    <div
      className={` ${styles.container} ${styles['card']} `}
      onClick={handleClick}
    >
      <img
        className={styles.image}
        src={imgLink}
        alt="dungeons and dragons dice set"
      />
      <p className={styles.cardName}>{cardName}</p>
    </div>
  )
}

export default Card
