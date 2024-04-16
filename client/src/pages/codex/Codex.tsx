import Image from '../../assets/Campaigns.webp'

import Card from '../../components/utils/Card'
import Categories from '../../data/Categories'

import styles from './css/Codex.module.css'

function Codex() {
  return (
    <>
      <div className={styles.wrapperRecent}>
        <p>here will be recent entries</p>
      </div>
      <div className={styles.gallery}>
        {Categories.map((el, i) => {
          const categoryName = el
            .toLowerCase()
            .replace(/'/g, '-')
            .replace(/\s/g, '-')
            .replace(/&/g, 'and')

          return (
            <Card key={i} cardName={el} image={Image} link={categoryName} />
          )
        })}
      </div>
    </>
  )
}

export default Codex
