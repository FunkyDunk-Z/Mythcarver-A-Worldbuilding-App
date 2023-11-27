import styles from './css/Card.module.css'
import { useNavigate } from 'react-router-dom'

function Card(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  const size = props.size ? styles[props.size] : ''
  const cardType = props.cardType ? styles[props.cardType] : ''
  const cardName = props.cardName ? props.cardName : 'Default Card'

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(props.link)
    console.log(props.link)
  }

  return (
    <div
      className={` ${styles.container} ${cName} ${size} ${cardType}`}
      onClick={handleNavigate}
    >
      <p className={styles.cardName}>{cardName}</p>
    </div>
  )
}

export default Card
