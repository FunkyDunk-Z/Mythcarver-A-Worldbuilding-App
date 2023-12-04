import styles from './css/CreateCharacter.module.css'

import { useState } from 'react'

function CreateCharacter() {
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  return (
    <div className={`${styles.container} ${styles['page']}`}>
      <div className={`${styles.container} ${styles['form']}`}>
        <label className={styles.label} htmlFor="characterName">
          Character Name
        </label>
        <input
          className={styles.input}
          id="characterName"
          name="characterName"
          type="text"
          placeholder="Character name"
          autoComplete="off"
          spellCheck="false"
          value={formData.firstName} // here we should get username's character
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default CreateCharacter
