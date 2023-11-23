import styles from './css/Card.module.css'

function Card(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  const size = props.size ? styles[props.size] : ''
  const cardType = props.cardType ? styles[props.cardType] : ''
  const cardName = props.cardName ? props.cardName : 'Default Card'

  return (
    <div className={` ${styles.container} ${cName} ${size} ${cardType}`}>
      <p className={styles.cardName}>{cardName}</p>
    </div>
  )
}

export default Card
