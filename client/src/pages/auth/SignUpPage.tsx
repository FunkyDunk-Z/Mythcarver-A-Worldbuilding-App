import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthFetch } from '../../hooks/useAuthFetch'

import styles from './css/SignUpPage.module.css'

function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const { authFetch } = useAuthFetch()

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSignUp = async (e: FormEventType) => {
    e.preventDefault()

    await authFetch({
      credentials: true,
      requestType: 'POST',
      url: 'users/sign-up',
      authType: 'signUp',
      dataToSend: formData,
    })

    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    })

    window.location.reload()
  }

  return (
    <div className={styles.wrapper}>
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
        <button type="submit">Create Account</button>
      </form>
      <Link className="link" to={'/login'}>
        Already have an account? Login here
      </Link>
    </div>
  )
}

export default SignUpPage
