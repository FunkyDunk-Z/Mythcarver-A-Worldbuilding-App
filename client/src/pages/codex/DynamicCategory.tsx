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
    currentCategory,
    currentCodex,
    dispatchCodexState,
    dispatchCategoryState,
  } = useCodexContext()

  useEffect(() => {
    const compareCategories = () => {
      if (!currentCategory) {
        return console.log('no category')
      }
      if (!currentCodex) {
        return console.log('no codex')
      }

      if (category._id !== currentCategory?._id) {
        category.isCurrent = true
        currentCategory.isCurrent = false
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
          id: currentCategory._id,
          fields: {
            isCurrent: false,
          },
        })

        docFetch({
          requestType: 'PATCH',
          url: 'category',
          dataToSend: docsToPush,
        })

        dispatchCodexState({
          type: 'SET_CURRENT_CODEX',
          payload: currentCodex,
        })
        dispatchCategoryState({
          type: 'SET_CURRENT_CATEGORY',
          payload: category,
        })
      }
    }
    compareCategories()
  }, [
    currentCodex,
    currentCategory,
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
      <h1 className={styles.categoryName}>{currentCategory?.categoryName}</h1>
      <MyButton handleClick={handleNavigate}>Create New</MyButton>
      <div className={styles.gallery}>
        {currentCategory?.docs.map((el, i) => {
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
