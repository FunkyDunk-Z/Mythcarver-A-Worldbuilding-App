import { useState } from 'react'

// Hooks
import { useAuthFetch } from '../../hooks/useAuthFetch'

// Components
import MyButton from '../../components/utils/MyButton'

// Css
import styles from './css/ForgotPasswordPage.module.css'

interface I_ForgotPassword {
  email: string
}

function ForgotPasswordPage() {
  const { authFetch } = useAuthFetch()
  const [formData, setFormData] = useState<I_ForgotPassword>({
    email: '',
  })

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault()

    console.log(e)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.wrapperInput}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          placeholder="youremail@email.com"
          onChange={handleChange}
          value={formData.email}
          required
        ></input>
        <MyButton type="submit">Send Email</MyButton>
      </div>
    </form>
  )
}

export default ForgotPasswordPage
