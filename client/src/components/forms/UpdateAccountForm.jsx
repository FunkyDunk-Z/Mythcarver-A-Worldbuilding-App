import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateAccount } from '../../hooks/useUpdateAccount'
import MyButton from '../utils/MyButton'
import styles from './Form.module.css'

function UpdateAccountForm(props) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const user = props.user
  const [avatar, setAvatar] = useState('')
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    avatarURL: user.avatarURL,
  })
  const { updateAccount, myError } = useUpdateAccount()

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === 'file') {
      const fileSelected = files[0]
      const fileReader = new FileReader()

      fileReader.readAsDataURL(fileSelected)

      fileReader.onloadend = () => {
        setAvatar(fileReader.result)
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const formDataForUpdate = new FormData()
    formDataForUpdate.append('firstName', formData.firstName)
    formDataForUpdate.append('lastName', formData.lastName)
    formDataForUpdate.append('email', formData.email)
    formDataForUpdate.append('username', formData.username)

    if (avatar && avatar !== user.avatar) {
      formDataForUpdate.append('avatarURL', avatar)
    }

    await updateAccount(formDataForUpdate)

    setFormData((prevFormData) => ({
      ...prevFormData,
    }))

    navigate('/my-account')
  }

  const handleUpload = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className={`${styles.container} ${styles['form']}`}>
      <form onSubmit={handleUpdate} className={styles.form}>
        <label className={styles.label} htmlFor="avatarURL">
          Avatar
        </label>
        <input
          className={styles.input}
          type="file"
          name="avatarURL"
          accept="image/*"
          onChange={handleChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        {!avatar ? (
          <img
            className={`${styles.avatar} ${styles['preview']}`}
            src={user.avatarURL}
            alt="Preview"
          />
        ) : (
          <img
            className={`${styles.avatar} ${styles['preview']}`}
            src={avatar}
            alt="Preview"
          />
        )}
        <MyButton handleClick={handleUpload} label="Choose File" />
        <label className={styles.label} htmlFor="firstName">
          First Name
        </label>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          id="firstName"
          autoComplete="off"
          spellCheck="false"
          value={formData.firstName}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="lastName">
          Last Name
        </label>
        <input
          className={styles.input}
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="off"
          spellCheck="false"
          value={formData.lastName}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <input
          className={styles.input}
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          spellCheck="false"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="text"
          name="email"
          id="email"
          autoComplete="off"
          spellCheck="false"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <div className={styles.btn}>
          <MyButton handleClick={handleUpdate} label="Save" />
          <MyButton handleClick={handleCancel} label="Cancel" />

          {myError && <div className={styles.error}>{myError}</div>}
        </div>
      </form>
    </div>
  )
}

export default UpdateAccountForm
