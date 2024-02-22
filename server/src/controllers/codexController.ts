import { createOne, getAll } from '../util/crudOps'
import Codex from '../models/codexModel'

export const createCodex = createOne(Codex)
export const getAllCodex = getAll(Codex)
