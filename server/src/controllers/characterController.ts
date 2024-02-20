import { createOne } from '../util/crudOps'
import Character from '../models/characterModel'

export const createCharacter = createOne(Character)
