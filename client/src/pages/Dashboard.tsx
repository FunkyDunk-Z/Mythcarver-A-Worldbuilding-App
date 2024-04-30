import { useCodexContext } from '../hooks/useCodexContext'

import Card from '../components/utils/Card'
import Image from '../assets/d20.jpg'

import styles from './css/Dashboard.module.css'

function Dashboard() {
  const { codex } = useCodexContext()

  console.log(codex)

  return (
    <div className={styles.wrapper}>
      {codex?.recent.docs.map((el, i) => {
        return <Card key={i} cardName={el.docName} link={el.docId} />
      })}
      {codex?.categories.map((el, i) => {
        return (
          <Card
            key={i}
            cardName={el.categoryName}
            image={Image}
            link={el.categoryUrl}
          />
        )
      })}
    </div>
  )
}

export default Dashboard
