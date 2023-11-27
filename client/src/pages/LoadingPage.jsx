import styles from './css/LoadingPage.module.css'

function LoadingPage(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return <div className={` ${styles.container} ${cName}`}></div>
}

export default LoadingPage
