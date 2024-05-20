import { useState } from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAuthContext } from '../../hooks/useAuthContext'

// Hooks
import { useAuthFetch } from '../../hooks/useAuthFetch'

// components
import MyButton from '../../components/utils/MyButton'

// css
import styles from './css/LoginPage.module.css'

function LoginPage() {
  const { error } = useAuthContext()
  const [formData, setFormData] = useState({
    email: import.meta.env.VITE_EMAIL || '',
    password: import.meta.env.VITE_PASSWORD || '',
  })

  const { authFetch } = useAuthFetch()

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleLogin = async (e: FormEventType) => {
    e.preventDefault()

    await authFetch({
      dataToSend: formData,
      url: 'users/login',
      authType: 'login',
      requestType: 'POST',
    })

    setFormData({
      email: '',
      password: '',
    })
  }
  // console.log(error)

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.wrapperInput}>
          <label htmlFor="email-login" className={styles.label}>
            Email:
          </label>
          <input
            className={styles.input}
            type="text"
            id="email-login"
            name="email"
            placeholder="youremail@email.com"
            autoComplete="off"
            onChange={handleChange}
            value={formData.email}
            required
          ></input>
        </div>
        <div className={styles.wrapperInput}>
          <label htmlFor="password-login" className={styles.label}>
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password-login"
            name="password"
            placeholder="*********"
            onChange={handleChange}
            value={formData.password}
            required
          ></input>
        </div>
        {error ? <p className={styles.error}>{error}</p> : null}
        <MyButton type="submit">Login</MyButton>
      </form>
      <Link className={styles.link} to={'/forgot-password'}>
        Forgot Password?
      </Link>
      <Link className={styles.link} to={'/sign-up'}>
        Sign Up Here
      </Link>
    </div>
  )
}

export default LoginPage
