// Context
import { useCodexContext } from '../../hooks/useCodexContext'

// Pages
import CreateStandardCharacter from './categories/characters/CreateStandardCharacter'

// Css
import styles from './css/DynamicCreate.module.css'

function DynamicCreate() {
  const { currentCategory } = useCodexContext()
  console.log(currentCategory)

  // if (!currentCategory) {
  //   return new Error('no active category')
  // }

  // const { docType, _id } = currentCategory

  const RenderForm = () => {
    switch (currentCategory?.docType) {
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
      <p>{currentCategory?._id}</p>
      <RenderForm />
    </div>
  )
}

export default DynamicCreate
