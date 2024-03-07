import { createOne, deleteOne, getAll, getOne } from '../util/crudOps'
import Character from '../models/characterModel'

export const createCharacter = createOne(Character)
export const getCharacters = getAll(Character)
export const deleteCharacter = deleteOne(Character)
export const getCharacter = getOne(Character)
