import styles from './css/MyButton.module.css'

function MyButton(props) {
  return (
    <button
      onClick={handleClick}
      className={`${styles.btn} ${styles[props.theme]}`}
    >
      {props.label}
    </button>
  )
}

export default MyButton
