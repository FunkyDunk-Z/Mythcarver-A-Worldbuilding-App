import React, { useState } from 'react'
import styles from './Form.module.css'
import MyButton from '../utils/MyButton'
import { useSignUp } from '../../hooks/useSignUp'

function SignUp(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  })
  const { signUp, myError, isLoading } = useSignUp()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    await signUp(formData)

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    })
  }

  return (
    <div className={`${styles.container} ${cName}`}>
      <h3 className={styles.formTitle}>Sign Up</h3>
      <form onSubmit={handleSignUp} className={styles.form}>
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
        <label className={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="passwordConfirm">
          Password Confirm:
        </label>
        <input
          className={styles.input}
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        ></input>
        <div className={styles.btn}>
          <MyButton
            handleClick={handleSignUp}
            isDisabled={isLoading}
            label="Sign Up"
          />

          {myError && <div className={styles.error}>{myError}</div>}
        </div>
      </form>
    </div>
  )
}

export default SignUp
