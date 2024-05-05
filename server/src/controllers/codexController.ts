import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from '../util/crudOps'
import { Codex } from '../models/codexModel'

export const createCodex = createOne(Codex)
export const getCodex = getOne(Codex)
export const getAllCodex = getAll(Codex)
export const updateCodex = updateOne(Codex)
export const deleteCodex = deleteOne(Codex)
