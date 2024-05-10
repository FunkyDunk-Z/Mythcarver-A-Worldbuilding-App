import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCodexContext } from '../../hooks/useCodexContext'
import { useDocFetch } from '../../hooks/useDocFetch'

// Styles
import styles from './css/CreateCodex.module.css'

const CreateCodex = () => {
  const { user } = useAuthContext()
  const { dispatchCodexState } = useCodexContext()
  const { docFetch } = useDocFetch()

  const [formData, setFormData] = useState<CodexType>({
    codexName: '',
    codexUrl: '',
    createdBy: '',
    isCurrent: false,
    recent: [],
    categories: [],
  })

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleCreateCodex = async (e: FormEventType) => {
    e.preventDefault()

    await docFetch({
      credentials: true,
      requestType: 'POST',
      url: 'users/sign-up',
      authType: 'signUp',
      dataToSend: formData,
    })

    setFormData({
      codexName: '',
      codexUrl: '',
      createdBy: '',
      isCurrent: false,
      recent: [],
      categories: [],
    })
  }

  return (
    <div className={styles.wrapperPage}>
      <h2>Create Codex</h2>
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
        <MyButton type="submit">Create Account</MyButton>
        {/* <button type="submit">Create Account</button> */}
      </form>
    </div>
  )
}
