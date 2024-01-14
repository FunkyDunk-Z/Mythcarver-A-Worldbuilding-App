import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Form.module.css'
import MyButton from '../utils/MyButton'
import { useLogin } from '../../hooks/useLogin'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: 'dunc@gmail.com',
    password: '123456789',
  })
  const { login, error, isLoading } = useLogin()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    await login(formData)

    setFormData({
      email: '',
      password: '',
    })
  }

  return (
    <div className={`${styles.container} ${styles['form']}`}>
      <form onSubmit={handleLogin} className={`${styles.form}`}>
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
        ></input>
        <div className={styles.btn}>
          <MyButton
            handleClick={handleLogin}
            isDisabled={isLoading}
            label={'Login'}
            theme=""
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
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

export default LoginForm
