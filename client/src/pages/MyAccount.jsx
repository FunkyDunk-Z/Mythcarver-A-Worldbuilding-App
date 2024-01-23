import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import UpdateAccountForm from '../components/forms/UpdateAccountForm'

import MyButton from '../components/utils/MyButton'
import PlaceholderPortrait from '../assets/PlaceholderPortrait.png'

import styles from './css/MyAccount.module.css'

function MyAccount() {
  const [updateActive, setUpdateActive] = useState(false)
  const { user } = useAuthContext()

  const handleClick = () => {
    setUpdateActive(!updateActive)
  }

  return (
    <div className={`${styles.container} ${styles['myAccount']}`}>
      <>
        <img
          className={styles.profilePicture}
          src={!user.profilePicture ? PlaceholderPortrait : user.profilePicture}
          alt=""
        />
        {updateActive ? <MyButton label="upload" theme="upload" /> : ''}
      </>
      <h1>Basic info</h1>

      {!updateActive ? (
        <div className={`${styles.container} ${styles.info}`}>
          <p>First Name : {user.firstName}</p>
          <p>Last Name : {user.lastName}</p>
          <p>Username : {user.username}</p>
          <p>Email : {user.email}</p>
        </div>
      ) : (
        <UpdateAccountForm user={user} setUpdateActive={setUpdateActive} />
      )}

      <MyButton
        label={!updateActive ? 'Update' : 'Cancel'}
        handleClick={handleClick}
      />
    </div>
  )
}

export default MyAccount
