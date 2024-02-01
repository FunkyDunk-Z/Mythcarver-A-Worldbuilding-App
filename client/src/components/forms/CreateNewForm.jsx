import { useState } from 'react'
import { useCreateArticle } from '../../hooks/useCreateArticle'
import MyButton from '../utils/MyButton'

import styles from './Form.module.css'

function CreateNewForm({ formSections, formData, fetchPath, formName }) {
  const { createNew, isLoading, articleError } = useCreateArticle()
  const { articles } = formSections[formSections.length - 1]

  const storedUserData = localStorage.getItem('user')
  const { id } = JSON.parse(storedUserData)

  const [currentFormData, setCurrentFormData] = useState({
    createdBy: id,
    ...formData,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createNew(currentFormData, fetchPath)

    setCurrentFormData({
      createdBy: id,
      ...formData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form}`}>
      <h1 className={styles.formName}>{formName}</h1>
      {formSections.map((el, i) => {
        if (!el.articles)
          return (
            <div key={i}>
              <label htmlFor={el.inputId} className={styles.label}>
                {el.label}
              </label>
              <input
                className={styles.input}
                type={el.type}
                id={el.inputId}
                name={el.inputId}
                placeholder={el.placeholder}
                autoComplete="off"
                onChange={handleChange}
                value={currentFormData[el.inputId]}
                required
              />
            </div>
          )
      })}
      {articles.map((el, i) => {
        return (
          <div key={i}>
            <label htmlFor={el.inputId} className={styles.label}>
              {el.label}
            </label>
            <textarea
              className={`${styles.input} ${styles['article']}`}
              type={el.type}
              id={el.inputId}
              name={el.inputId}
              placeholder={el.placeholder}
              autoComplete="off"
              onChange={handleChange}
              value={currentFormData[el.inputId]}
              required
              // contentEditable
            />
          </div>
        )
      })}
      <div className={styles.btn}>
        <MyButton
          handleClick={handleSubmit}
          isDisabled={isLoading}
          label={'Create'}
          theme=""
        />
        {articleError && <p className={styles.error}>{articleError}</p>}
      </div>
    </form>
  )
}

export default CreateNewForm
