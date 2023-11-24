import styles from './css/Navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useLogout } from '../../hooks/useLogout'
import MyButton from '../utils/MyButton'

function Navbar(props) {
  // const navRef = useRef()
  const cName = props.pageName ? styles[props.pageName] : ''
  const mobile = window.innerWidth < 768
  const [isMobile, setIsMobile] = useState(mobile)
  const [isActive, setIsActive] = useState(false)
  const { pathname } = useLocation()
  const { logout } = useLogout()

  useEffect(() => {
    function handleSize() {
      if (window.innerWidth >= 768) {
        setIsActive(false)
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
    setIsActive(false)
  }, [pathname])

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (!navRef.current.contains(e.target)) {
  //       setIsActive(false)
  //     }
  //   }
  //   window.addEventListener('mousedown', handler)
  // })

  const toggleNavBtn = () => {
    setIsActive(!isActive)
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
        className={
          isMobile
            ? `${styles.container} ${cName} ${styles['mobile']} ${
                isActive ? styles.open : ''
              }`
            : `${styles.container} ${cName}`
        }
      >
        <Link to={'/'} onClick={toggleNavBtn}>
          Home
        </Link>
        <Link to={'/codex'} onClick={toggleNavBtn}>
          Codex
        </Link>
        <div className={styles.logoutBtn}>
          <MyButton handleClick={handleClick} label="Logout" />
        </div>
      </div>
    </>
  )
}

export default Navbar
