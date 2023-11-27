import styles from './css/Nations.module.css'

function Nations(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Nations</p>
    </div>
  )
}

export default Nations
