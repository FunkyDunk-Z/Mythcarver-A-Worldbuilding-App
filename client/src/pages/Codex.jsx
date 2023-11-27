import styles from './css/Codex.module.css'

import Card from '../components/utils/Card'

function Codex(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <Card
        pageName="card"
        size="medium"
        cardName="Campaigns"
        link="campaigns"
      />
      <Card
        pageName="card"
        size="medium"
        cardName="Characters"
        link="characters"
      />
      <Card pageName="card" size="medium" cardName="Factions" link="factions" />
      <Card
        pageName="card"
        size="medium"
        cardName="Locations"
        link="locations"
      />
      <Card pageName="card" size="medium" cardName="Nations" link="nations" />
      <Card pageName="card" size="medium" cardName="Species" link="species" />
    </div>
  )
}

export default Codex
