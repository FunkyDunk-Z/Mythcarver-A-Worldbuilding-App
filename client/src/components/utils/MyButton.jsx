import React from 'react'
import styles from './css/MyButton.module.css'

function MyButton(props) {
  return (
    <button
      onClick={props.handleClick}
      disabled={props.isDisabled}
      className={`${styles.btn} ${styles[props.theme]}`}
      aria-controls={props.label}
      aria-disabled={props.isDisabled}
      role="button"
    >
      {props.label}
    </button>
  )
}

export default MyButton
