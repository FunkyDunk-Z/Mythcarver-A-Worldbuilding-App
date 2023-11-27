import styles from './css/Species.module.css'

function Species(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Species</p>
    </div>
  )
}

export default Species
