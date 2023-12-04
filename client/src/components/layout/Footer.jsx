import styles from './css/Footer.module.css'

function Footer() {
  return (
    <div className={` ${styles.container} ${styles['footer']}`}>
      <p className={styles.copyright}>
        @copyright Mythcarver - A Worldbuilding App
      </p>
    </div>
  )
}

export default Footer
