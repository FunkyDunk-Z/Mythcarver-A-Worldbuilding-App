import styles from './css/Footer.module.css'

function Footer(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p className={styles.copyright}>
        @copyright Mythcarver - A Worldbuilding App
      </p>
    </div>
  )
}

export default Footer
