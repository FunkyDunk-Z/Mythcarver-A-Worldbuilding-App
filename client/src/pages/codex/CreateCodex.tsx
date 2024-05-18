import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCodexContext } from '../../hooks/useCodexContext'
import { useDocFetch } from '../../hooks/useDocFetch'

// pages
import LoadingPage from '../LoadingPage'

// Components
import MyButton from '../../components/utils/MyButton'
import Select from '../../components/utils/Select'

// Styles
import styles from './css/CreateCodex.module.css'

const CreateCodex = () => {
  const { user } = useAuthContext()
  const { dispatchCodexState, currentCodex } = useCodexContext() // Assuming currentCodex is available here
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

  const [categoryInputs, setCategoryInputs] = useState<string[]>([''])
  const [docType, setDocType] = useState<string>('')

  if (!user || !currentCodex) {
    return <LoadingPage />
  }

  formData.createdBy = user.id

  const handleCategoryChange = (index: number, value: string) => {
    const newCategoryInputs = [...categoryInputs]
    newCategoryInputs[index] = value
    setCategoryInputs(newCategoryInputs)

    const newCategories = newCategoryInputs.map((name) => ({
      _id: '',
      createdBy: user.id,
      codexId: currentCodex._id,
      categoryName: name,
      categoryUrl: '',
      docs: [],
      docType: '',
      thumbnail: '',
      isCurrent: true,
    }))

    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: newCategories,
    }))
  }

  const addCategoryInput = () => {
    setCategoryInputs([...categoryInputs, ''])
  }

  const handleChangeDocType = (docType: string) => {
    console.log(docType)
  }

  const handleCreateCodex = async (e: FormEventType) => {
    e.preventDefault()

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

    setCategoryInputs([''])
  }

  // console.log(formData)
  console.log(categoryInputs)

  return (
    <div className={styles.wrapperPage}>
      <form onSubmit={handleCreateCodex} className={styles.form}>
        <label className={styles.label} htmlFor="codexName">
          Codex Name:
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

        {categoryInputs.map((category, i) => (
          <div className={styles.wrapperCategories} key={i}>
            <label className={styles.label} htmlFor={`category-${i}`}>
              Category Name:
            </label>
            <input
              className={styles.input}
              type="text"
              name={`category-${i}`}
              id={`category-${i}`}
              value={category}
              onChange={(e) => handleCategoryChange(i, e.target.value)}
            ></input>
            <Select
              onChange={() => handleChangeDocType('character')}
              options={['Character', 'Item', 'Lore']}
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
