import styles from './Form.module.css'

import { useCreateArticle } from '../../hooks/useCreateArticle'
import { useState } from 'react'
import MyButton from '../utils/MyButton'

function CreateNewForm(props) {
  const { createNew, isLoading, myError } = useCreateArticle()
  const formSections = props.formSections
  const { articles } = formSections[formSections.length - 1]

  // console.log(articles)

  const storedUserData = localStorage.getItem('user')
  const { id } = JSON.parse(storedUserData)

  const [formData, setFormData] = useState({
    createdBy: id,
    ...props.formData,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createNew(formData, props.fetchPath)

    setFormData({
      createdBy: id,
      ...props.formData,
    })
  }

  console.log(formData)

  return (
    <form onSubmit={handleSubmit} className={`${styles.form}`}>
      <h1 className={styles.formName}>{props.formName}</h1>
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
                value={formData[el.inputId]}
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
              value={formData[el.inputId]}
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
        {myError && <p className={styles.error}>{myError}</p>}
      </div>
    </form>
  )
}

export default CreateNewForm
