import { DocType, CategoryType, RecentType, Codex } from '../models/codexModel'
import { CharacterType } from '../models/characterModel'

import AppError from '../util/appError'

type PropTypes = {
  recent: RecentType
  categories?: CategoryType[]
  doc: CharacterType
  refModel: string
  docType: string
  reqType: 'create' | 'update'
}

const addToUserCodex = async ({
  recent,
  categories,
  doc,
  refModel,
  docType,
  reqType,
}: PropTypes) => {
  try {
    const docToAdd = {
      docId: doc._id,
      refModel,
      docName: doc.docName,
      docType,
      docImage: doc.avatarURL ? doc.avatarURL : null,
    }

    if (reqType === 'create') {
      categories?.map((el, i) => {
        if (i === doc.categoryIndex) {
          el.docs.push(docToAdd)
        }
        if (recent.docs.length === recent.lengthAllowed) {
          recent.docs.pop()
        }
      })
    }

    if (reqType === 'update') {
      const docIndex = recent.docs.findIndex((obj) => obj.docId === doc._id)
      console.log(docIndex)

      if (docIndex !== -1) {
        recent.docs.splice(docIndex, 1)
      }
      if (recent.docs.length <= recent.lengthAllowed) {
        recent.docs.pop()
      }
    }

    recent.docs.unshift(docToAdd)
  } catch (error) {
    console.error(error)
    return new AppError('Could not create or update doc', 404)
  }
}

export default addToUserCodex
