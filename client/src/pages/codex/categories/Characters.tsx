import { useAuthContext } from '../../../hooks/useAuthContext'

import styles from './css/Characters.module.css'

function Characters() {
  const { user } = useAuthContext()
  const url = window.location.href.split('/')[4]
  const currentCodex = user?.codex.map((el) => {
    if (el._id === url) {
      return el
    }
  })

  console.log(user, url, currentCodex)

  const handleCreate = () => {
    console.log('click')
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCreate}>Create Character</button>
    </div>
  )
}

export default Characters
