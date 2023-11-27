import styles from './css/Codex.module.css'

import Card from '../components/utils/Card'

function Codex(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <Card pageName="card" size="medium" cardName="Species" />
      <Card pageName="card" size="medium" cardName="Nations" />
      <Card pageName="card" size="medium" cardName="Factions" />
      <Card pageName="card" size="medium" cardName="Characters" />
      <Card pageName="card" size="medium" cardName="Locations" />
      <Card pageName="card" size="medium" cardName="Campaigns" />
    </div>
  )
}

export default Codex
