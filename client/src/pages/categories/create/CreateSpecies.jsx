import styles from './css/CreateSpecies.module.css'
import { useState } from 'react'

function CreateSpecies() {
  const storedUserData = localStorage.getItem('user')
  const { id } = JSON.parse(storedUserData)
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
  return (
    <div className={` ${styles.container} ${styles['page']}`}>
      <p>CreateSpecies </p>
    </div>
  )
}

export default CreateSpecies
