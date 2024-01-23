import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useUpdateAccount } from '../../hooks/useUpdateAccount'
import MyButton from '../utils/MyButton'
import styles from './Form.module.css'

function UpdateAccountForm(props) {
  const user = props.user
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    profilePicture: user.profilePicture,
  })

  const { updateAccount, myError } = useUpdateAccount()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    await updateAccount(formData)

    props.setUpdateActive(false)
  }
  return (
    <div className={`${styles.container} ${styles['form']}`}>
      <form onSubmit={handleUpdate} className={styles.form}>
        <label className={styles.label} htmlFor="firstName">
          First Name:
        </label>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          id="firstName"
          autoComplete="off"
          value={formData.firstName}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="lastName">
          Last Name:
        </label>
        <input
          className={styles.input}
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="off"
          value={formData.lastName}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="username">
          Username:
        </label>
        <input
          className={styles.input}
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.input}
          type="text"
          name="email"
          id="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <div className={styles.btn}>
          <MyButton handleClick={handleUpdate} label="Save" />

          {myError && <div className={styles.error}>{myError}</div>}
        </div>
      </form>
    </div>
  )
}

export default UpdateAccountForm
