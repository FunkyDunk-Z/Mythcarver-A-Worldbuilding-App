const User = require('../models/userModel')
const crudOps = require('../utils/crudOps')
const AppError = require('../utils/appError')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.getMyAccount = async (req, res, next) => {
  req.params.id = req.user.id

  next()
}

exports.updateMyAccount = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Please use update my password', 400))
  }
  const { email } = req.body

  if (req.body.avatarURL) {
    const result = await cloudinary.uploader.upload(req.body.avatarURL, {
      public_id: email.split('@')[0],
    })
    req.body.avatarURL = result.secure_url
  }

  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'username',
    'email',
    'avatarURL'
  )

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    user: updatedUser.getUserInfo(),
  })
}

exports.deleteMyAccount = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null,
  })
}

exports.getUser = async (req, res, next) => {
  try {
    const query = User.findById(req.params.id)

    const user = await query.populate({
      path: 'codex',
      select: '-__v -user',
    })

    if (!user) {
      return next(new AppError('No Document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: user.getUserInfo(),
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

exports.createUser = crudOps.createOne(User)
exports.getAllUsers = crudOps.getAll(User)
// exports.getUser = crudOps.getOne(User)
exports.updateUser = crudOps.updateOne(User)
exports.deleteUser = crudOps.deleteOne(User)
