import { useState } from 'react'

import MyButton from './MyButton'

import styles from './css/Dropdown.module.css'

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.wrapper}>
      <MyButton handleClick={toggleIsOpen}>Toggle Dropdown</MyButton>
      {isOpen ? (
        <div>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown
