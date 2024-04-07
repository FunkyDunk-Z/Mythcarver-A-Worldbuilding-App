import MyButton from './MyButton'

import styles from './css/Slider.module.css'

type SliderChildren = React.ReactNode

type PropType = {
  children: SliderChildren[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

function Slider({ children, currentIndex, setCurrentIndex }: PropType) {
  const nextSlide = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    console.log(currentIndex)
  }
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className={styles.wrapperSlider}>
      <div className={styles.wrapperBtns}>
        {currentIndex > 0 ? (
          <MyButton handleClick={prevSlide}>{`<<`}</MyButton>
        ) : null}
        {currentIndex < children.length - 1 ? (
          <MyButton handleClick={nextSlide}>{`>>`}</MyButton>
        ) : null}
      </div>
      <div className={styles.slider}>
        {children.map((el, i) => {
          return (
            <div
              className={`${
                i === currentIndex ? styles.slideCurrent : styles.slide
              }`}
              key={i}
            >
              {el}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Slider
