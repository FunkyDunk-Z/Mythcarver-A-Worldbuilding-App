import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import MyButton from '../components/utils/MyButton'

import styles from './css/MyAccount.module.css'

function MyAccount() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/my-account/update')
  }

  return (
    <div className={`${styles.container} ${styles['myAccount']}`}>
      <>
        <img className={styles.avatar} src={user.avatarURL} alt="" />
      </>

      <div className={`${styles.container} ${styles.info}`}>
        <p>First Name : {user.firstName}</p>
        <p>Last Name : {user.lastName}</p>
        <p>Username : {user.username}</p>
        <p>Email : {user.email}</p>
      </div>
      <MyButton label="Update" handleClick={handleClick} />
    </div>
  )
}

export default MyAccount
