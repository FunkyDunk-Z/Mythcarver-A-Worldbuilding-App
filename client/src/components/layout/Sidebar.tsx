import { useState } from 'react'
import { Link } from 'react-router-dom'

import Categories from '../../data/Categories'
import MyButton from '../utils/MyButton'

import styles from './css/Sidebar.module.css'

function Sidebar() {
  const [isActive, setIsActive] = useState(false)
  const [openStatus, setOpenStatus] = useState('')
  const url = window.location.href.split('/')[3]

  const toggleIsActive = () => {
    setIsActive(!isActive)

    if (!openStatus || openStatus === 'closed') {
      setOpenStatus('opened')
    } else {
      setOpenStatus('closed')
    }
  }
  return (
    <div className={`${styles.wrapper} ${styles[openStatus]}`}>
      <div className={styles.btn}>
        <MyButton handleClick={toggleIsActive}>
          {isActive ? '<<' : '>>'}
        </MyButton>
      </div>
      {Categories.map((el, i) => {
        const categoryName = el
          .toLowerCase()
          .replace(/'/g, '-')
          .replace(/\s/g, '-')
          .replace(/&/g, 'and')
        return (
          <Link key={i} className={styles.link} to={`/${url}/${categoryName}`}>
            {el}
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
