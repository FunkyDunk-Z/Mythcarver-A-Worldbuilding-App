import styles from './css/Navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLogout } from '../../hooks/useLogout'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import MyButton from '../utils/MyButton'

function Navbar() {
  const scrollDirection = useScrollDirection()
  const [isActive, setIsActive] = useState(false)
  const [isOpen, setIsOpen] = useState('')
  const { pathname } = useLocation()
  const { logout } = useLogout()

  useEffect(() => {
    function handleSize() {
      if (window.innerWidth >= 900) {
        setIsActive(false)
        setIsOpen('')
      }
    }

    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  useEffect(() => {
    if (scrollDirection === 'down') {
      setIsActive(false)
      setIsOpen('closed')
      // setIsOpen('')
    }
  })

  useEffect(() => {
    setIsActive(false)
    setIsOpen('')
  }, [pathname])

  const toggleNavBtn = () => {
    setIsActive(!isActive)

    if (!isOpen || isOpen === 'closed') {
      setIsOpen('opened')
    } else {
      setIsOpen('closed')
    }
  }

  const handleClick = () => {
    toggleNavBtn()
    logout()
  }

  return (
    <>
      <div
        className={`${styles.burgerIcon} ${isActive ? styles.open : ''}`}
        onClick={toggleNavBtn}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
      <div
        className={`${styles.container} ${styles['navbar']} ${styles[isOpen]}`}
      >
        <Link to={'/'} onClick={toggleNavBtn}>
          Dashboard
        </Link>
        <Link to={'/codex'} onClick={toggleNavBtn}>
          Codex
        </Link>
        <Link to={'/my-account'} onClick={toggleNavBtn}>
          My Account
        </Link>
        <MyButton handleClick={handleClick} label="Logout" />
      </div>
    </>
  )
}

export default Navbar
