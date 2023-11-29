import styles from './css/Header.module.css'
import Logo from '../../assets/Logo.jpg'
import { useNavigate } from 'react-router-dom'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useAuthContext } from '../../hooks/useAuthContext'

import Navbar from './Navbar'

function Header(props) {
  const scrollDirection = useScrollDirection()
  const { isLoggedIn } = useAuthContext()
  const cName = props.pageName ? styles[props.pageName] : ''
  const direction = scrollDirection === 'down' ? 'scroll' : ''
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div
      id="header"
      className={`${styles.container} ${cName} ${styles[direction]}`}
    >
      <img className={styles.logo} src={Logo} alt="" onClick={handleNavigate} />
      {isLoggedIn ? <Navbar pageName="navbar" /> : ''}
    </div>
  )
}

export default Header
