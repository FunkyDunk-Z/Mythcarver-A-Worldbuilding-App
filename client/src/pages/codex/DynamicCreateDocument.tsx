// Context
import { useCodexContext } from '../../hooks/useCodexContext'

// Pages
import CreateStandardCharacter from './categories/characters/CreateStandardCharacter'

// Css
import styles from './css/DynamicCreate.module.css'

function DynamicCreate() {
  const { activeCategory } = useCodexContext()
  console.log(activeCategory)

  // if (!activeCategory) {
  //   return new Error('no active category')
  // }

  // const { docType, _id } = activeCategory

  const RenderForm = () => {
    switch (activeCategory?.docType) {
      case 'Character':
        return <CreateStandardCharacter />

      default:
        console.error('Invalid document type')
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      <p>DynamicCreate</p>
      <p>{activeCategory?._id}</p>
      <RenderForm />
    </div>
  )
}

export default DynamicCreate
