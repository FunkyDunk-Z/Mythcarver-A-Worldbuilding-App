import { useAuthContext } from '../hooks/useAuthContext'

import Card from '../components/utils/Card'
import Image from '../assets/d20.jpg'

import styles from './css/Dashboard.module.css'

function Dashboard() {
  const { user } = useAuthContext()

  return (
    <div className={styles.wrapper}>
      {user?.codex.map((el, i) => {
        return (
          <Card
            key={i}
            cardName={el?.codexName}
            image={Image}
            link={el?.codexName}
            codexId={el?._id}
          />
        )
      })}
    </div>
  )
}

export default Dashboard
