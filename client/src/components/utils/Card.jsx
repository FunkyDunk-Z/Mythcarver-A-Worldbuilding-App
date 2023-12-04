import styles from './css/Card.module.css'
import { useNavigate } from 'react-router-dom'

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
      <h1 className={styles.cardName}>{props.cardName}</h1>
    </div>
  )
}

export default Card
