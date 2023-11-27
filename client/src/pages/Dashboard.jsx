import styles from './css/Dashboard.module.css'
import Spinner from '../components/utils/Spinner'

function Dashboard(props) {
  const cName = props.pageName ? styles[props.pageName] : ''

  return (
    <div className={`${styles.container} ${cName}`}>
      <p>Welcome</p>
    </div>
  )
}

export default Dashboard
