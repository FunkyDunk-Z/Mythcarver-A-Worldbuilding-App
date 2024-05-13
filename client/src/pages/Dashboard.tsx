import { useCodexContext } from '../hooks/useCodexContext'

import Card from '../components/utils/Card'

import styles from './css/Dashboard.module.css'

function Dashboard() {
  const { activeCodex } = useCodexContext()

  return (
    <>
      <div className={styles.slider}>
        {activeCodex?.recent.map((el, i) => {
          return (
            <Card
              key={i}
              cardName={el.docName}
              image={el.thumbnail}
              link={`${el.categoryUrl}/${el.docId}`}
              docType={el.docType}
              docSubType={el?.docSubType}
            />
          )
        })}
      </div>
      <div className={styles.gallery}>
        {activeCodex?.categories.map((el, i) => {
          return (
            <Card
              key={i}
              cardName={el.categoryName}
              image={el.thumbnail}
              link={el.categoryUrl}
            />
          )
        })}
      </div>
    </>
  )
}

export default Dashboard
