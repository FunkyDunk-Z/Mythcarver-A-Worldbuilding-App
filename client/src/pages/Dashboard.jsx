import styles from './css/Dashboard.module.css'
import { useNavigate } from 'react-router-dom'
import Card from '../components/utils/Card'
import MyButton from '../components/utils/MyButton'

function Dashboard() {
  const storedUserData = localStorage.getItem('user')
  const { codex } = JSON.parse(storedUserData)
  const navigate = useNavigate()

  const navToCreateCharacter = () => {
    navigate('/create/character')
  }
  const navToCreateSpecies = () => {
    navigate('/create/species')
  }

  return (
    <div className={`${styles.container} ${styles['dashboard']}`}>
      <MyButton handleClick={navToCreateCharacter} label="Create New Character" />
      <MyButton handleClick={navToCreateSpecies} label="Create New Species" />
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
