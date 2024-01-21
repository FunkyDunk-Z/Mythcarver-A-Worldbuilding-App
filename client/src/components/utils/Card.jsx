import { useNavigate } from 'react-router-dom'

import styles from './css/Card.module.css'

function Card(props) {
  const navigate = useNavigate()
  const handleClick = () => {
    return navigate(`${props.link}`)
  }

  return (
    <div
      className={` ${styles.container} ${styles['card']} `}
      onClick={handleClick}
    >
      <img className={styles.image} src={props.imgLink} alt="" />
      <p className={styles.cardName}>{props.cardName}</p>
    </div>
  )
}

export default Card
