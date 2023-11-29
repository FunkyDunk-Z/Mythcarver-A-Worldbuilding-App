import React from 'react'
import styles from './css/MyButton.module.css'

function MyButton(props) {
  return (
    <button
      onClick={props.handleClick}
      disabled={props.isDisabled}
      className={`${styles.btn} ${styles[props.theme]}`}
      aria-controls={props.label} // Set aria-label with the label text
      aria-disabled={props.isDisabled} // Reflect button's disabled state to assistive technologies
      role="button" // Specify the role as a button for screen readers
    >
      {props.label}
    </button>
  )
}

export default MyButton
