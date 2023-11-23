const crudOps = require('../utils/crudOps')

const Species = require('../models/speciesModel')

exports.getAllSpecies = crudOps.getAll(Species)
exports.getSpecies = crudOps.getOne(Species)
exports.createSpecies = crudOps.createOne(Species)
exports.updateSpecies = crudOps.updateOne(Species)
exports.deleteSpecies = crudOps.deleteOne(Species)
