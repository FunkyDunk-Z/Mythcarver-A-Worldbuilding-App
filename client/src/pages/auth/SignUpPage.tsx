import { useState } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAuthContext } from '../../hooks/useAuthContext'

// Hooks
import { useAuthFetch } from '../../hooks/useAuthFetch'

// Components
import MyButton from '../../components/utils/MyButton'

// Css
import styles from './css/SignUpPage.module.css'

interface I_SignUpData {
  firstName: string
  lastName: string
  username: string
  email: string
  emailConfirm: string
  password: string
  passwordConfirm: string
  avatarURL: string
}

function SignUpPage() {
  const { error } = useAuthContext()
  const { authFetch } = useAuthFetch()
  const [formData, setFormData] = useState<I_SignUpData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    avatarURL: '',
  })
  const [mismatchPassword, setMismatchPassword] = useState<string | null>(null)
  const [mismatchEmail, setMismatchEmail] = useState<string | null>(null)

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target

    if (name === 'emailConfirm' && value !== formData.email) {
      setMismatchEmail('Emails do not match')
    }
    if (name === 'passwordConfirm' && value !== formData.password) {
      setMismatchPassword('Passwords do not match')
    }

    if (name === 'emailConfirm' && value === formData.email) {
      setMismatchEmail(null)
    }
    if (name === 'passwordConfirm' && value === formData.password) {
      setMismatchPassword(null)
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSignUp = async (e: FormEventType) => {
    e.preventDefault()

    if (!formData) {
      return
    }
    const { password, passwordConfirm, email, emailConfirm } = formData

    if (email !== emailConfirm) {
      return setMismatchEmail('Emails do not match')
    }
    if (password !== passwordConfirm) {
      setMismatchPassword('Passwords do not match')
      return
    }

    await authFetch({
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
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      avatarURL: '',
    })
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
          required
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
          required
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
          required
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
          required
        ></input>
        <div className={styles.wrapperInput}>
          <label className={styles.label} htmlFor="emailConfirm">
            Email Confirm:
          </label>
          <input
            className={`${styles.input} ${
              mismatchEmail ? styles.mismatch : ''
            }`}
            type="text"
            name="emailConfirm"
            id="emailConfirm"
            autoComplete="off"
            value={formData.emailConfirm}
            onChange={handleChange}
            required
          ></input>
          {mismatchEmail ? (
            <p className={styles.errorLabel}>{mismatchEmail}</p>
          ) : null}
        </div>
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
          required
        ></input>
        <div className={styles.wrapperInput}>
          <label className={styles.label} htmlFor="passwordConfirm">
            Password Confirm:
          </label>
          {mismatchPassword ? (
            <p className={styles.errorLabel}>{mismatchPassword}</p>
          ) : null}
          <input
            className={`${styles.input} ${
              mismatchPassword ? styles.mismatch : ''
            }`}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
          ></input>
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}
        <MyButton type="submit">Create Account</MyButton>
      </form>
      <Link className="link" to={'/login'}>
        Already have an account? Login here
      </Link>
    </div>
  )
}

export default SignUpPage
