import { useState } from 'react'

import MyButton from './MyButton'

import styles from './css/Select.module.css'

type OptionTypes = {
  options: string[]
  handleChange: (selectedOption: string) => void
}

function Select({ options, handleChange }: OptionTypes) {
  const [currentOption, setCurrentOption] = useState('Choose Option')

  const logOption = (option: string) => {
    setCurrentOption(option)
    handleChange(option)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperBtn}>
        {options
          ? options.map((el, i) => (
              <MyButton handleClick={() => logOption(el)} key={i}>
                {el}
              </MyButton>
            ))
          : null}
      </div>
      <h3 id="characterType">{currentOption}</h3>
    </div>
  )
}

export default Select
