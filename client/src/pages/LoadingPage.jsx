import styles from './css/LoadingPage.module.css'
import Spinner from '../components/utils/Spinner'

function LoadingPage() {
  return (
    <div className={` ${styles.container} ${styles['loadingPage']}`}>
      <Spinner />
    </div>
  )
}

export default LoadingPage
