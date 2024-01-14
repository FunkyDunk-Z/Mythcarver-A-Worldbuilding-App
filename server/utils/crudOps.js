const AppError = require('./appError')

exports.createOne = (Model) => async (req, res, next) => {
  try {
    console.log(req.user._id)
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: doc,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const user = req.user._id
    const docs = await Model.find()
    let doc = []

    for (let i = 0; i < docs.length; i++) {
      if (docs[i].createdBy.toString() === user.toString()) {
        doc.push(docs[i])
      }
    }

    if (!doc) {
      return next(new AppError('No Documents found', 404))
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id)
    // if (popOptions) query = query.populate(popOptions)
    const doc = await query

    if (!doc) {
      return next(new AppError('No Document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No Document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No Document found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}
