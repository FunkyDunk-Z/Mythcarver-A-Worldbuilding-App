import styles from './css/MyButton.module.css'

function MyButton(props) {
  return (
    <button
      onClick={props.handleClick}
      disabled={props.isDisabled}
      className={`${styles.btn} ${styles[props.theme]}`}
    >
      {props.label}
    </button>
  )
}

export default MyButton
