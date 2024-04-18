import { createOne, getAll, updateOne } from '../util/crudOps'
import Codex from '../models/codexModel'

export const createCodex = createOne(Codex)
export const getAllCodex = getAll(Codex)
export const updateCodex = updateOne(Codex)
