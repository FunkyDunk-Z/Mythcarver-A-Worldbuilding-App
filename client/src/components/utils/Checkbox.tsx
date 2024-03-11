import { useState } from 'react'
import styles from './css/Checkbox.module.css'

type CheckboxType = {
  label?: string
  checked: boolean
}

const Checkbox = ({ label, checked }: CheckboxType) => {
  const [isChecked, setIsChecked] = useState(checked)

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
