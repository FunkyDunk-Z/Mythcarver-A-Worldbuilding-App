import styles from './css/Codex.module.css'

import Image from '../assets/Campaigns.webp'

import Card from '../components/utils/Card'

function Codex() {
  const storedUserData = localStorage.getItem('user')
  const userData = JSON.parse(storedUserData)
  const urlID = window.location.href.split('/')[4]

  const currentCodex = userData.codex.find(
    (codexItem) => codexItem._id === urlID
  )

  const excludedKeys = ['_id', 'codexName']
  const categories = Object.keys(currentCodex)
    .filter((key) => !excludedKeys.includes(key))
    .sort()

  return (
    <div className={` ${styles.container} ${styles['codex']}`}>
      {categories.map((el) => {
        const capitalizedElement = el.charAt(0).toUpperCase() + el.slice(1)
        return (
          <Card
            key={el}
            // imgLink="https://picsum.photos/200/300/?random"
            imgLink={Image}
            cardName={capitalizedElement}
            link={el}
          />
        )
      })}
    </div>
  )
}

export default Codex
