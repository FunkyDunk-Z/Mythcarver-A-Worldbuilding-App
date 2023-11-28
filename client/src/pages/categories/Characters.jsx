import styles from './css/Characters.module.css'
import Card from '../../components/utils/Card'

function Characters(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <h1 className={styles.header}>Player Characters</h1>
      <div className={`${styles.container} ${styles['gallery']}`}>
        <Card
          size="medium"
          cardType="landscape"
          link=""
          cardName="Create New Character"
          new={true}
        />
      </div>
      <h1 className={styles.header}>Npc's</h1>
      <div className={`${styles.container} ${styles['gallery']}`}>
        <Card
          size="medium"
          cardType="landscape"
          link=""
          cardName="Create New Npc"
          new={true}
        />
      </div>
    </div>
  )
}

export default Characters
