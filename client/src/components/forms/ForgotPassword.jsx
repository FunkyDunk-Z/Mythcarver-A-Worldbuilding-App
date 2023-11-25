import React, { useState } from 'react'
import styles from './Form.module.css'
import { useForgotPassword } from '../../hooks/useForgotPassword'
import MyButton from '../../components/utils/MyButton'

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
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Forgot Password?</h3>
      <form className={styles.containerForm} onSubmit={handleSubmit}>
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
        <div>
          <span>{message && <p className={styles.message}>{message}</p>}</span>
          <MyButton handleClick={handleSubmit} isDisabled={isLoading}>
            Submit
          </MyButton>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
