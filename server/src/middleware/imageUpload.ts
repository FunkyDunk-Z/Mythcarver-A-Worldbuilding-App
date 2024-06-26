import multer, { memoryStorage } from 'multer'

const storage = memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
})

export default upload.single('avatarURL')
