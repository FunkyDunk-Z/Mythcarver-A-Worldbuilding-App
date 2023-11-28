import styles from './css/Card.module.css'
import { useNavigate } from 'react-router-dom'

function Card(props) {
  const size = props.size ? styles[props.size] : ''
  const cardType = props.cardType ? styles[props.cardType] : ''
  const cardName = props.cardName ? props.cardName : 'Default Card'
  const isNew = props.new ? props.new : ''

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(props.link)
    console.log(props.link)
  }

  return (
    <div
      className={` ${styles.container} ${styles['card']} ${size} ${cardType}`}
      onClick={handleNavigate}
    >
      <p className={styles.cardName}>{cardName}</p>
      {isNew ? (
        <span className={styles.circle}>
          <span className={styles.plus}></span>
        </span>
      ) : (
        ''
      )}
    </div>
  )
}

export default Card
