import styles from './css/MyAccount.module.css'

function MyAccount(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  const storedUserData = localStorage.getItem('user')
  const userData = JSON.parse(storedUserData)

  return (
    <div className={`${styles.container} ${cName}`}>
      <div className={`${styles.container} ${styles.info}`}>
        <h3>Basic info</h3>
        <p>First Name : {userData.firstName}</p>
        <p>Last Name : {userData.lastName}</p>
        <p>Username : {userData.username}</p>
        <p>Email : {userData.email}</p>
      </div>
    </div>
  )
}

export default MyAccount
