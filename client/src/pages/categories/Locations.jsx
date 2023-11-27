import styles from './css/Locations.module.css'

function Locations(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Locations</p>
    </div>
  )
}

export default Locations
