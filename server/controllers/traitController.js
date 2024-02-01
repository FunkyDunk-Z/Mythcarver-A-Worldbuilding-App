const crudOps = require('../utils/crudOps')

const Trait = require('../models/traitModel')

exports.getAllTraits = crudOps.getAll(Trait)
exports.getTrait = crudOps.getOne(Trait)
exports.createTrait = crudOps.createOne(Trait)
exports.updateTrait = crudOps.updateOne(Trait)
exports.deleteTrait = crudOps.deleteOne(Trait)
