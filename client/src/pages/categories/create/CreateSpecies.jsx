import styles from './css/CreateSpecies.module.css'
import { useState } from 'react'
import MyButton from '../../../components/utils/MyButton'
import { useCreateArticle } from '../../../hooks/useCreateArticle'

function CreateSpecies() {
  const storedUserData = localStorage.getItem('user')
  const { id } = JSON.parse(storedUserData)
  const { createNew } = useCreateArticle()
  const [formData, setFormData] = useState({
    createdBy: id,
    speciesName: '',
    size: '',
    speed: '',
    lifeSpan: '',
    articles: [
      {
        articleName: '',
        articleContent: '',
      },
    ],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createNew(formData, 'species')

    setFormData({
      createdBy: '',
      speciesName: '',
      size: '',
      speed: '',
      lifeSpan: '',
      articles: [
        {
          articleName: '',
          articleContent: '',
        },
      ],
    })

    // navigate('/')
  }

  return (
    <div className={` ${styles.container} ${styles['page']}`}>
      <div className={`${styles.container} ${styles['form']}`}>
        <label className={styles.label} htmlFor="speciesName">
          Species Name
        </label>
        <input
          className={styles.input}
          id="speciesName"
          name="speciesName"
          type="text"
          placeholder="Species name"
          autoComplete="off"
          spellCheck="false"
          value={formData.speciesName}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.container} ${styles['form']}`}>
        <label className={styles.label} htmlFor="size">
          size
        </label>
        <input
          className={styles.input}
          id="size"
          name="size"
          type="text"
          placeholder="medium"
          autoComplete="off"
          spellCheck="false"
          value={formData.size}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.container} ${styles['form']}`}>
        <label className={styles.label} htmlFor="speed">
          Speed
        </label>
        <input
          className={styles.input}
          id="speed"
          name="speed"
          type="number"
          placeholder="30 ft."
          autoComplete="off"
          value={formData.speed}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.container} ${styles['form']}`}>
        <label className={styles.label} htmlFor="lifeSpan">
          Life Span
        </label>
        <input
          className={styles.input}
          id="lifeSpan"
          name="lifeSpan"
          type="text"
          placeholder="100 - 150 yrs"
          autoComplete="off"
          spellCheck="false"
          value={formData.lifeSpan}
          onChange={handleChange}
        />
      </div>
      <MyButton label="create" handleClick={handleSubmit} />
    </div>
  )
}

export default CreateSpecies
