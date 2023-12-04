import styles from './css/Header.module.css'
import Logo from '../../assets/Logo.jpg'
import { useNavigate } from 'react-router-dom'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useAuthContext } from '../../hooks/useAuthContext'

import Navbar from './Navbar'

function Header() {
  const scrollDirection = useScrollDirection()
  const { isLoggedIn, state } = useAuthContext()
  const direction = scrollDirection === 'down' ? 'scroll' : ''
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div
      id="header"
      className={`${styles.container} ${styles['header']} ${styles[direction]}`}
    >
      <img className={styles.logo} src={Logo} alt="" onClick={handleNavigate} />
      {isLoggedIn ? <Navbar pageName="navbar" /> : ''}
    </div>
  )
}

export default Header
