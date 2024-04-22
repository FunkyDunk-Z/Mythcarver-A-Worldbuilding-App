// import { useState } from 'react'
// import { useCodexContext } from '../../hooks/useCodexContext'
// import { useDocFetch } from '../../hooks/useDocFetch'
// import Card from '../../components/utils/Card'

import styles from './css/DynamicCategory.module.css'

type PropType = {
  categoryName: string
  categoryDocs: DocType[]
}

function DynamicCategory({ categoryDocs, categoryName }: PropType) {
  // const { docFetch } = useDocFetch()
  // const [docs, setDocs] = useState(null)

  // docFetch({
  //   credentials: true,
  //   requestType: 'GET',
  //   url: `/codex/${categoryName.toLowerCase()}`,
  // })

  console.log(categoryDocs)

  return (
    <div className={styles.wrapper}>
      <p>Dynamic Category : {categoryName}</p>
      {/* {categoryDocs.map((el, i) => {
        return (
          <div className={styles.gallery}>
            <Card />
          </div>
        )
      })} */}
    </div>
  )
}

export default DynamicCategory
