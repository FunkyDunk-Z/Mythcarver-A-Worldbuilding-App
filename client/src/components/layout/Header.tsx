import { useAuthContext } from '../../hooks/useAuthContext'
import { useCodexContext } from '../../hooks/useCodexContext'
import { useNavigate } from 'react-router-dom'

import Navbar from './Navbar'

import styles from './css/Header.module.css'

function Header() {
  const { user } = useAuthContext()
  const { activeCodex } = useCodexContext()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/${activeCodex?.codexUrl}`)
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
