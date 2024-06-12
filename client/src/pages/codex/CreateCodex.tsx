import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCodexContext } from '../../hooks/useCodexContext'

// Hooks
import { useDocFetch } from '../../hooks/useDocFetch'

// pages
import LoadingPage from '../LoadingPage'

// Components
import MyButton from '../../components/utils/MyButton'
import Select from '../../components/utils/Select'

// Styles
import styles from './css/CreateCodex.module.css'

// Data
import Categories from '../../data/Categories'

const CreateCodex = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { currentCodex } = useCodexContext() // Assuming currentCodex is available here
  const { docFetch } = useDocFetch()

  const [formData, setFormData] = useState<CodexType>({
    _id: '',
    createdBy: '',
    codexName: '',
    codexUrl: '',
    recent: [],
    categories: [],
    isCurrent: true,
  })

  const [categoryInputs, setCategoryInputs] = useState<
    { name: string; docType: string }[]
  >([{ name: '', docType: '' }])

  if (!user || !currentCodex) {
    return <LoadingPage />
  }

  formData.createdBy = user.id

  const handleCategoryChange = (index: number, value: string) => {
    const newCategoryInputs = [...categoryInputs]
    newCategoryInputs[index].name = value
    setCategoryInputs(newCategoryInputs)

    const newCategories = newCategoryInputs.map((input) => ({
      categoryName: input.name,
      docType: input.docType,
    }))

    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: newCategories,
    }))
  }

  const handleDocTypeChange = (index: number, docType: string) => {
    const newCategoryInputs = [...categoryInputs]
    newCategoryInputs[index].docType = docType
    setCategoryInputs(newCategoryInputs)

    const newCategories = newCategoryInputs.map((input) => ({
      categoryName: input.name,
      docType: input.docType,
      isCurrent: true,
    }))

    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: newCategories,
    }))
  }

  const addCategoryInput = () => {
    setCategoryInputs([...categoryInputs, { name: '', docType: '' }])
  }

  const handleCreateCodex = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const navTo = formData.codexName.replace(/ /g, '-').toLowerCase()

    await docFetch({
      requestType: 'POST',
      url: 'codex',
      dataToSend: formData,
    })

    setFormData({
      _id: '',
      codexName: '',
      codexUrl: '',
      createdBy: '',
      isCurrent: false,
      recent: [],
      categories: [],
    })

    setCategoryInputs([{ name: '', docType: '' }])
    navigate(`/${navTo}`)
  }

  return (
    <div className={styles.wrapperPage}>
      <form onSubmit={handleCreateCodex} className={styles.form}>
        <label className={styles.label} htmlFor="codexName">
          Codex Name
        </label>
        <input
          className={styles.input}
          type="text"
          name="codexName"
          id="codexName"
          autoComplete="off"
          value={formData.codexName}
          onChange={(e) =>
            setFormData({ ...formData, codexName: e.target.value })
          }
        ></input>

        <p className={styles.label}>Categories</p>
        {categoryInputs.map((category, i) => (
          <div className={styles.wrapperCategories} key={i}>
            {/* <label className={styles.label} htmlFor={`category-${i}`}>
              Category Name:
            </label> */}
            <input
              className={styles.input}
              type="text"
              name={`category-${i}`}
              id={`category-${i}`}
              value={category.name}
              spellCheck="false"
              autoComplete="off"
              onChange={(e) => handleCategoryChange(i, e.target.value)}
            ></input>
            <Select
              options={Categories}
              value={category.docType}
              onChange={(value) =>
                value ? handleDocTypeChange(i, value) : null
              }
              selectName="Document Type"
            />
          </div>
        ))}
        <MyButton type="button" handleClick={addCategoryInput}>
          Add Category
        </MyButton>

        <MyButton type="submit">Create Codex</MyButton>
      </form>
    </div>
  )
}

export default CreateCodex
