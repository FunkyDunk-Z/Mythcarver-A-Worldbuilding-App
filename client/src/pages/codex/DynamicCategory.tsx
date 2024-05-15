import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { useCodexContext } from '../../hooks/useCodexContext'

// Hooks
import { useDocFetch } from '../../hooks/useDocFetch'

// Componenets
import Card from '../../components/utils/Card'
import MyButton from '../../components/utils/MyButton'

import styles from './css/DynamicCategory.module.css'

interface I_Props {
  category: CategoryType
}

interface I_UpdateData {
  id: string
  fields: I_Object
}

interface I_UpdateMany {
  updates: I_UpdateData[]
}

function DynamicCategory({ category }: I_Props) {
  const navigate = useNavigate()
  const { docFetch } = useDocFetch()
  const {
    activeCategory,
    activeCodex,
    dispatchCodexState,
    dispatchCategoryState,
  } = useCodexContext()

  useEffect(() => {
    const compareCategories = () => {
      if (!activeCategory) {
        return new Error('No Active Category')
      }
      if (!activeCodex) {
        return new Error('No Active Codex')
      }
      if (category._id !== activeCategory?._id) {
        category.isCurrent = true
        activeCategory.isCurrent = false
        const docsToPush: I_UpdateMany = {
          updates: [],
        }
        const { updates } = docsToPush

        updates.push({
          id: category._id,
          fields: {
            isCurrent: true,
          },
        })
        updates.push({
          id: activeCategory._id,
          fields: {
            isCurrent: false,
          },
        })

        dispatchCodexState({
          type: 'SET_CURRENT_CODEX',
          payload: activeCodex,
        })
        dispatchCategoryState({
          type: 'SET_CURRENT_CATEGORY',
          payload: category,
        })

        docFetch({
          requestType: 'PATCH',
          url: 'category',
          dataToSend: docsToPush,
        })
      }
    }
    compareCategories()
  }, [
    activeCodex,
    activeCategory,
    dispatchCategoryState,
    dispatchCodexState,
    docFetch,
    category,
  ])

  const handleNavigate = () => {
    navigate('create')
  }
  return (
    <div className={styles.wrapperPage}>
      <h1 className={styles.categoryName}>{activeCategory?.categoryName}</h1>
      <MyButton handleClick={handleNavigate}>Create New</MyButton>
      <div className={styles.gallery}>
        {activeCategory?.docs.map((el, i) => {
          return (
            <Card
              key={i}
              cardName={el.docName ? el.docName : 'No name'}
              image={el.thumbnail}
              link={el.docId}
              docType={el.docType}
              docSubType={el?.docSubType}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DynamicCategory
