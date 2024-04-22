import Card from '../../components/utils/Card'

import Image from '../../assets/d20.jpg'

import styles from './css/DynamicCategory.module.css'

type PropType = {
  categoryName: string
  docs: DocType[]
}

function DynamicCategory({ docs, categoryName }: PropType) {
  return (
    <div className={styles.wrapper}>
      <p>Dynamic Category : {categoryName}</p>
      <div className={styles.gallery}>
        {docs.map((el, i) => {
          return (
            <Card
              key={i}
              cardName={el.docName ? el.docName : 'No name'}
              image={Image}
              link={el.docId}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DynamicCategory
