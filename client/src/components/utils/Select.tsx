import { useState } from 'react'

import MyButton from './MyButton'

import styles from './css/Select.module.css'

type Option = string | undefined

type OptionTypes = {
  options: Option[]
  value: string
  onChange: (value: Option) => void
  theme?: string
  selectName: string
}

function Select({ options, onChange, value, theme, selectName }: OptionTypes) {
  const [isOpen, setIsOpen] = useState(false)

  function selectOption(option: Option) {
    if (option !== value) onChange(option)
  }

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  const clearOptions = (e: MouseEventType) => {
    e.stopPropagation()
    onChange(`Choose a ${selectName}`)
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={toggleIsOpen}
      tabIndex={0}
      className={`${styles.wrapper} ${!theme ? '' : styles[theme]}`}
    >
      <span className={styles.value}>
        {!value ? `Choose a ${selectName}` : value}
      </span>
      <MyButton type="button" theme="clear" handleClick={clearOptions}>
        &times;
      </MyButton>
      <div className={styles.divider}></div>
      <div className={`${styles.caret} ${isOpen ? styles.open : ''}`}></div>
      <ul className={`${styles.options}  ${isOpen ? styles.show : ''}`}>
        {options.map((el, i) => (
          <li
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              selectOption(el)
              setIsOpen(false)
            }}
            className={styles.option}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
