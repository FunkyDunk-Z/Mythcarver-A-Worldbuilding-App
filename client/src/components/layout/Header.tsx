import { useAuthContext } from '../../hooks/useAuthContext'
import { useCodexContext } from '../../hooks/useCodexContext'
import { useNavigate } from 'react-router-dom'

import Navbar from './Navbar'

import styles from './css/Header.module.css'

function Header() {
  const { user } = useAuthContext()
  const { currentCodex } = useCodexContext()
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (user) {
      navigate(`/${currentCodex?.codexUrl}`)
    }
  }

  return (
    <div id="header" className={styles.wrapper}>
      <h1
        className={`${styles.title} ${user ? styles.pointer : ''}`}
        onClick={handleNavigate}
      >
        Mythcarver
      </h1>
      <Navbar />
    </div>
  )
}

export default Header
