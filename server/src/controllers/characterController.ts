import { createOne, deleteOne, getAll, getOne } from '../util/crudOps'
import Character from '../models/characterModel'

export const getAllCharacters = getAll(Character)
export const getCharacter = getOne(Character)
export const createCharacter = createOne(Character)
export const deleteCharacter = deleteOne(Character)
