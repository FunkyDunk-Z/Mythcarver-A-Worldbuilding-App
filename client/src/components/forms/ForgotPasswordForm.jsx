import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Form.module.css'
import { useForgotPassword } from '../../hooks/useForgotPassword'
import MyButton from '../utils/MyButton'

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  })
  const { forgotPassword, error, isLoading, message } = useForgotPassword()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await forgotPassword(formData)

    setFormData({
      email: '',
    })
  }

  return (
    <div className={`${styles.container} ${styles['form']}`}>
      <h3 className={styles.formTitle}>Forgot Password?</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          className={styles.input}
          type="text"
          id="email"
          name="email"
          placeholder="youremail@email.com"
          autoComplete="off"
          onChange={handleChange}
          value={formData.email}
          required
        ></input>
        <div className={styles.btn}>
          <span>{message && <p className={styles.message}>{message}</p>}</span>
          <MyButton
            handleClick={handleSubmit}
            isDisabled={isLoading}
            label={'Confirm'}
            theme=""
          />

          {error && <p className={styles.error}>{error}</p>}
        </div>
        <Link className={styles.link} to={'/login'}>
          Login
        </Link>
      </form>
    </div>
  )
}

export default ForgotPassword
