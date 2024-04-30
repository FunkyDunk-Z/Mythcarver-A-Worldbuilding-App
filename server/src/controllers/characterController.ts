import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../util/crudOps'
import { Character } from '../models/characterModel'

export const getAllCharacters = getAll(Character)
export const getCharacter = getOne(Character)
export const createCharacter = createOne(Character)
export const updateCharacter = updateOne(Character)
export const deleteCharacter = deleteOne(Character)
