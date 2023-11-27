import styles from './css/Characters.module.css'

function Characters(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Characters</p>
    </div>
  )
}

export default Characters
