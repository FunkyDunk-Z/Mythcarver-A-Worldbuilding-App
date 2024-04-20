import { Link } from 'react-router-dom'
// import { useAuthContext } from '../hooks/useAuthContext'
import { useCodexContext } from '../hooks/useCodexContext'

import Card from '../components/utils/Card'
import Image from '../assets/d20.jpg'

import styles from './css/Dashboard.module.css'

function Dashboard() {
  // const { user } = useAuthContext()
  const { codex } = useCodexContext()

  return (
    <div className={styles.wrapper}>
      <Link to={'/dynamic-category'}>Dynamic Category</Link>
      {codex?.categories.map((el, i) => {
        const categoryName = el.categoryName.toLowerCase()
        return (
          <Card
            key={i}
            cardName={el.categoryName}
            image={Image}
            link={categoryName}
          />
        )
      })}
    </div>
  )
}

export default Dashboard
