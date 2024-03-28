import { RefObject, ChangeEvent, MouseEvent, MouseEventHandler } from 'react'

import styles from './css/MyButton.module.css'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

type EventTypes =
  | ChangeEvent
  | MouseEvent
  | MouseEventHandler<HTMLButtonElement>
  | MouseEventType

interface ButtonProps {
  children: React.ReactNode
  handleClick?: (e?: EventTypes | undefined) => void
  isDisabled?: boolean
  theme?: string
  type?: ButtonType
  withRef?: RefObject<HTMLButtonElement>
}

function MyButton({
  children,
  handleClick,
  isDisabled,
  theme,
  type,
  withRef,
}: ButtonProps) {
  const defaultTheme = !theme ? '' : theme
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${styles.btn} ${styles[defaultTheme]}`}
      type={type}
      ref={withRef}
      role="button"
    >
      {children}
    </button>
  )
}

export default MyButton
