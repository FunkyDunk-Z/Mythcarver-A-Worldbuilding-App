import React, { useState } from 'react'
import styles from './Form.module.css'
import MyButton from '../../components/utils/MyButton'
import { useLogin } from '../../hooks/useLogin'

function Login(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
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
    <div className={`${styles.container} ${cName}`}>
      <h3 className={styles.formTitle}>Login</h3>
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
    </div>
  )
}

export default Login
