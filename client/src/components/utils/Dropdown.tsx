import { useState } from 'react'

import MyButton from './MyButton'

import styles from './css/Dropdown.module.css'

// interface Option {
//   value: string
// }

type OptionType = string

interface PropTypes {
  dropdownName: string
  options: OptionType[]
}

function Dropdown({ dropdownName, options }: PropTypes) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.wrapper}>
      <MyButton type="button" handleClick={toggleIsOpen}>
        {dropdownName}
      </MyButton>
      {isOpen ? (
        <div>
          {options.map((el, i) => {
            return <p key={i}>{el}</p>
          })}
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown
