import { useDocFetch } from '../../hooks/useDocFetch'

import styles from './css/DynamicCategory.module.css'

type PropType = {
  categoryId: string
}

function DynamicCategory({ categoryId }: PropType) {
  console.log(categoryId)

  return (
    <div className={styles.wrapper}>
      <p>DynamicCategory</p>
    </div>
  )
}

export default DynamicCategory
