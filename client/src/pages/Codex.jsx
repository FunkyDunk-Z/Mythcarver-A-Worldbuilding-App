import styles from './css/Codex.module.css'

import Card from '../components/utils/Card'

function Codex(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <Card pageName="card" size="large" />
      <Card pageName="card" size="large" />
      <Card pageName="card" size="large" />
      <Card pageName="card" size="large" />
      <Card pageName="card" size="large" />
    </div>
  )
}

export default Codex
