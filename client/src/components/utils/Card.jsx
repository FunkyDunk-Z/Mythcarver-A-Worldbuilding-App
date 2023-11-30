import styles from './css/Card.module.css'
import { useNavigate } from 'react-router-dom'
import MyButton from './MyButton'

function Card(props) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(props.link)
  }

  return (
    <div className={` ${styles.container} ${styles['card']} `}>
      <img className={styles.image} src={props.imgLink} alt="" />
      <h1 className={styles.cardName}>{props.cardName}</h1>
      <p className={styles.level}>Level {props.level}</p>
      <MyButton label={'Open'} handleClick={handleNavigate} />
    </div>
  )
}

export default Card
