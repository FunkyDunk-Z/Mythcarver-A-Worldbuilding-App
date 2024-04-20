import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAuthFetch } from '../../hooks/useAuthFetch'

// components
import MyButton from '../utils/MyButton'

// css
import styles from './css/Navbar.module.css'

function Navbar() {
  const { user } = useAuthContext()
  const { authFetch } = useAuthFetch()
  const mobile = window.innerWidth < 900
  const [isMobile, setIsMobile] = useState(mobile)
  const [isActive, setIsActive] = useState(false)
  const [openStatus, setOpenStatus] = useState('')
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setIsActive(false)
        setOpenStatus('')
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setIsActive(false)
        if (openStatus === 'opened') {
          setOpenStatus('closed')
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openStatus, isActive])

  const toggleNavBtn = () => {
    setIsActive(!isActive)

    if (isMobile) {
      if (!openStatus || openStatus === 'closed') {
        setOpenStatus('opened')
      } else {
        setOpenStatus('closed')
      }
    }
  }

  const handleLogout = () => {
    toggleNavBtn()
    authFetch({
      url: '/users/logout',
      credentials: false,
      authType: 'logout',
      requestType: 'POST',
    })
  }

  return (
    <>
      <div
        ref={navbarRef}
        className={`${styles.burgerIcon} ${isActive ? styles.active : ''}`}
        onClick={toggleNavBtn}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
      <div className={`${styles.wrapper} ${styles[openStatus]}`}>
        <Link to={'/dashboard'} onClick={toggleNavBtn} className={styles.link}>
          Dashboard
        </Link>
        <Link
          to={'/turn-tracker'}
          onClick={toggleNavBtn}
          className={styles.link}
        >
          Turn Tracker
        </Link>
        <Link to={'/my-account'} onClick={toggleNavBtn} className={styles.link}>
          {user?.username}
        </Link>
        <MyButton handleClick={handleLogout}>Logout</MyButton>
      </div>
    </>
  )
}

export default Navbar
