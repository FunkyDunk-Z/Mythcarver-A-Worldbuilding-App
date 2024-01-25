import { useAuthContext } from '../hooks/useAuthContext'

import Card from '../components/utils/Card'

import Image from '../assets/Campaigns.webp'
import styles from './css/Dashboard.module.css'

function Dashboard() {
  const { user } = useAuthContext()

  return (
    <div className={`${styles.container} ${styles['dashboard']}`}>
      <div>
        {user.codex.map((el, i) => {
          console.log(el)
          return (
            <Card
              key={i}
              imgLink={Image}
              cardName={el.codexName}
              link={`/codex/${el._id}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
