import styles from './css/Header.module.css'
import Logo from '../../assets/Logo.jpg'
import { useScrollDirection } from '../../hooks/useScrollDirection'

import Navbar from './Navbar'

function Header(props) {
  const scrollDirection = useScrollDirection()
  const cName = props.pageName ? styles[props.pageName] : ''
  const direction = scrollDirection === 'down' ? 'scroll' : ''

  console.log(direction)
  return (
    <div className={` ${styles.container} ${cName} ${styles[direction]}`}>
      <img className="logo" src={Logo} alt="" />
      <Navbar pageName="navbar" />
    </div>
  )
}

export default Header
