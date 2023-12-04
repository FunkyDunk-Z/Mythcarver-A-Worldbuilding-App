import styles from './css/NotFound.module.css'
import Image from '../../assets/Logo.jpg'

function NotFound() {
  return (
    <div className={` ${styles.container} ${styles['notFound']}`}>
      <img className={styles.img} src={Image} alt="Page Not Found" />
      <h2 className={styles.text}>This is not the page you are looking for!</h2>
    </div>
  )
}

export default NotFound
