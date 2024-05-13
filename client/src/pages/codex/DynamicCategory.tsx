import Card from '../../components/utils/Card'

import styles from './css/DynamicCategory.module.css'

interface PropType {
  categoryName: string
  docs: DocType[]
}

function DynamicCategory({ docs, categoryName }: PropType) {
  return (
    <div className={styles.wrapperPage}>
      <h1>{categoryName}</h1>
      <div className={styles.gallery}>
        {docs.map((el, i) => {
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
