import { useRef } from 'react'

import MyButton from './MyButton'

import styles from './css/ImageUploader.module.css'

type PropType = {
  avatar: string
  handleChange: (e: InputEventType) => void
}

function ImageUploader({ avatar, handleChange }: PropType) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="file"
        name="avatarURL"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <div className={styles.wrapperAvatar}>
        {avatar ? (
          <img
            className={`${styles.avatar} ${styles['preview']}`}
            src={avatar}
            alt="Preview"
          />
        ) : (
          <span className={styles.chooseImage}>
            Choose <br /> Image
          </span>
        )}
      </div>
      <MyButton
        type="button"
        handleClick={() => {
          fileInputRef.current?.click()
        }}
      >
        Upload
      </MyButton>
    </div>
  )
}

export default ImageUploader
