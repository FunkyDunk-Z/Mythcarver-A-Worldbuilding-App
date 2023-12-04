import styles from './css/Dashboard.module.css'
import Card from '../components/utils/Card'

function Dashboard() {
  const storedUserData = localStorage.getItem('user')
  const { codex } = JSON.parse(storedUserData)

  return (
    <div className={`${styles.container} ${styles['dashboard']}`}>
      <div className={`${styles.container} ${styles['gallery']}`}>
        {codex.map((el, i) => {
          return (
            <Card
              key={i}
              imgLink="https://picsum.photos/200/300/?random"
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
