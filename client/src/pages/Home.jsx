import styles from './css/Home.module.css'

import Login from '../components/forms/Login'
import SignUp from '../components/forms/SignUp'

function Home(props) {
  const cName = props.pageName ? styles[props.pageName] : ''

  return (
    <div className={`${styles.container} ${cName}`}>
      <Login pageName="form" />
      <SignUp pageName="form" />
    </div>
  )
}

export default Home
