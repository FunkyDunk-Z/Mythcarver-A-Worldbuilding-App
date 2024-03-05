import { useState } from 'react'
import styles from './css/Checkbox.module.css'

type CheckboxType = {
  label: string
}

const Checkbox = ({ label }: CheckboxType) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  )
}

export default Checkbox
