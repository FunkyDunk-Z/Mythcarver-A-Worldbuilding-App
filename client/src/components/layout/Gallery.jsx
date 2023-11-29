import styles from './css/Gallery.module.css'
import Card from '../utils/Card'

function Gallery(props) {
  return (
    <div className={` ${styles.container} ${styles['gallery']}`}>
      <Card imgLink="https://picsum.photos/200/300/?random" />
    </div>
  )
}

export default Gallery
