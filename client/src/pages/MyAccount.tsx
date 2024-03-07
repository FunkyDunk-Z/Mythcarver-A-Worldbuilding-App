import { useState, useRef, ChangeEvent, MouseEvent, FormEvent } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAuthFetch } from '../hooks/useAuthFetch'

import MyButton from '../components/utils/MyButton'

import styles from './css/MyAccount.module.css'

function MyAccount() {
  const { user } = useAuthContext()
  const { authFetch } = useAuthFetch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    username: user?.username,
    avatarURL: user?.avatarURL,
  })

  const toggleIsUpdating = () => {
    setIsUpdating(!isUpdating)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target

    if (files && type === 'file') {
      const fileSelected = files[0]
      const fileReader = new FileReader()

      fileReader.readAsDataURL(fileSelected)

      fileReader.onloadend = () => {
        if (typeof fileReader.result === 'string') {
          const newAvatar = fileReader.result
          setAvatar(newAvatar)
          formData.avatarURL = newAvatar
        }
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    console.log(formData)

    await authFetch({
      url: '/users/update-my-account',
      requestType: 'PATCH',
      credentials: false,
      dataToSend: formData,
      authType: 'update',
    })
  }

  const handleUpload = (e: MouseEvent) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  return (
    <div className={styles.wrapper}>
      {!isUpdating ? (
        <>
          <h1>Account info</h1>
          <img
            className={styles.image}
            src={user?.avatarURL}
            alt="Users Avatar"
          />
          <p>First Name : {user?.firstName}</p>
          <p>Last Name : {user?.lastName}</p>
          <p>Username : {user?.username}</p>
          <p>Email : {user?.email}</p>
          <MyButton handleClick={toggleIsUpdating}>Update</MyButton>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
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
                className={`${styles.image} ${styles['preview']}`}
                src={user?.avatarURL}
                alt="Preview"
              />
            ) : (
              <img
                className={`${styles.image} ${styles['preview']}`}
                src={avatar}
                alt="Preview"
              />
            )}
            <button onClick={handleUpload}>Upload</button>
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
            <button type="submit">Save</button>

            <MyButton handleClick={toggleIsUpdating}>Cancel</MyButton>
          </form>
        </>
      )}
    </div>
  )
}

export default MyAccount
