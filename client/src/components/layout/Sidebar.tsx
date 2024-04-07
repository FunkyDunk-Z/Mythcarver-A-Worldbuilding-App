import { useState } from 'react'
import { Link } from 'react-router-dom'

import Categories from '../../data/Categories'
import MyButton from '../utils/MyButton'

import styles from './css/Sidebar.module.css'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openStatus, setOpenStatus] = useState('')
  const url = window.location.href.split('/')[3]

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)

    if (!openStatus || openStatus === 'closed') {
      setOpenStatus('opened')
    } else {
      setOpenStatus('closed')
    }
  }
  return (
    <>
      <div className={`${styles.wrapper} ${styles[openStatus]}`}>
        {isOpen ? (
          <div className={`${styles.btnClose}`}>
            <MyButton handleClick={toggleIsOpen} theme="verticleTab">
              {'<'}
            </MyButton>
          </div>
        ) : (
          <div className={`${styles.btnOpen}`}>
            <MyButton handleClick={toggleIsOpen} theme="verticleTab">
              {'>'}
            </MyButton>
          </div>
        )}
        {Categories.map((el, i) => {
          const categoryName = el
            .toLowerCase()
            .replace(/'/g, '-')
            .replace(/\s/g, '-')
            .replace(/&/g, 'and')
          return (
            <Link
              key={i}
              className={styles.link}
              to={`/${url}/${categoryName}`}
            >
              {el}
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Sidebar
