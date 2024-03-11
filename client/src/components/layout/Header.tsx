import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

import Navbar from './Navbar'

import styles from './css/Header.module.css'

function Header() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div id="header" className={styles.wrapper}>
      <h1 className={styles.title} onClick={handleNavigate}>
        Mythcarver
      </h1>
      {user ? <Navbar /> : null}
    </div>
  )
}

export default Header
