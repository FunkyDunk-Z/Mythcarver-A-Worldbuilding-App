import styles from './css/Codex.module.css'

import Image from '../assets/Campaigns.webp'

import Card from '../components/utils/Card'
import Categories from '../Data/Categories'

function Codex() {
  return (
    <>
      <div className={styles.codex}>
        <div className={` ${styles.gallery}`}>
          {Categories.map((el, i) => {
            return (
              <Card
                key={i}
                imgLink={Image}
                cardName={el.categoryName}
                link={el.categoryName}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Codex
