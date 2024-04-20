import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCodexContext } from '../../hooks/useCodexContext'

import styles from './css/Card.module.css'

type CardProps = {
  link?: string
  image: string
  cardName?: string
  size?: string
}

function Card({ link, image, cardName, size }: CardProps) {
  const { user } = useAuthContext()
  const { codex } = useCodexContext()
  const navigate = useNavigate()

  const handleView = () => {
    // const linkUrl = codex?.codexName?.replace(/\s/g, '-').toLowerCase()
    // console.log(linkUrl)

    // if (linkUrl) {
    //   navigate(`/${linkUrl}/${link}`)
    // }
    navigate(`${link}`)
  }

  return (
    <div
      className={`${styles.wrapper} ${size ? styles[size] : ''}`}
      onClick={handleView}
    >
      <img className={styles.image} src={image} alt="image of category" />
      <div className={styles.cardDetails}>
        <p className={styles.cardName}>{cardName}</p>
      </div>
    </div>
  )
}

export default Card
