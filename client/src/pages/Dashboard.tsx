import { useCodexContext } from '../hooks/useCodexContext'

import Card from '../components/utils/Card'
import Image from '../assets/d20.jpg'

import styles from './css/Dashboard.module.css'

function Dashboard() {
  const { codex } = useCodexContext()

  return (
    <div className={styles.wrapper}>
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
