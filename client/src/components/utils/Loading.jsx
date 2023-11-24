import styles from './css/Loading.module.css'

function Loading(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <h1 className={styles.alert}>Page Is Loading</h1>
    </div>
  )
}

export default Loading
