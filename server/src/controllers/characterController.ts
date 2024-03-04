import { createOne, deleteOne, getAll } from '../util/crudOps'
import Character from '../models/characterModel'

export const createCharacter = createOne(Character)
export const getCharacters = getAll(Character)
export const deleteCharacter = deleteOne(Character)
