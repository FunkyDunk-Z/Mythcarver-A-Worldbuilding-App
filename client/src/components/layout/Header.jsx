import styles from './css/Header.module.css'
import Logo from '../../assets/Logo.jpg'

import Navbar from './Navbar'

function Header(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <img className="logo" src={Logo} alt="" />
      <Navbar pageName="navbar" />
    </div>
  )
}

export default Header
