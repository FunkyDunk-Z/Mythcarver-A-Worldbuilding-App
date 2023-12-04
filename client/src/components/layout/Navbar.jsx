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
  const mobile = window.innerWidth < 900
  const [isMobile, setIsMobile] = useState(false)
  const { pathname } = useLocation()
  const { logout } = useLogout()

  const storedUserData = localStorage.getItem('user')
  const userData = JSON.parse(storedUserData)

  useEffect(() => {
    function handleSize() {
      if (window.innerWidth >= 900) {
        setIsActive(false)
        setIsOpen('')
        setIsMobile(false)
      } else {
        setIsMobile(true)
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
      setIsOpen('')
    }
  })

  useEffect(() => {
    setIsActive(false)
    setIsOpen('')
  }, [pathname])

  const toggleNavBtn = () => {
    setIsActive(!isActive)

    if (mobile) {
      if (!isOpen || isOpen === 'closed') {
        setIsOpen('opened')
      } else {
        setIsOpen('closed')
      }
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
        <Link className={styles.link} to={'/'} onClick={toggleNavBtn}>
          Dashboard
        </Link>
        <Link className={styles.link} to={'/my-account'} onClick={toggleNavBtn}>
          {userData.username}
        </Link>
        <MyButton handleClick={handleClick} label="Logout" />
      </div>
    </>
  )
}

export default Navbar
