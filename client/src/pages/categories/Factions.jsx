import styles from './css/Factions.module.css'

function Factions(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Factions</p>
    </div>
  )
}

export default Factions
