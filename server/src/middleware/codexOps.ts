import { CategoryType, RecentType } from '../models/codexModel'
import { CharacterType } from '../models/characterModel'

import AppError from '../util/appError'

type PropTypes = {
  recent: RecentType
  categories?: CategoryType[]
  doc: CharacterType
  refModel: string
  docType: string
  docSubType?: string
  reqType: 'create' | 'update' | 'delete'
}

const codexOps = async ({
  recent,
  categories,
  doc,
  refModel,
  docType,
  docSubType,
  reqType,
}: PropTypes) => {
  try {
    const docToAdd = {
      docId: doc._id,
      refModel,
      docName: doc.commonProps.docName,
      docType,
      docSubType: docSubType ? doc.docSubType : undefined,
      docImage: doc.avatarURL ? doc.avatarURL : null,
    }
    const docRecentIndex = recent.docs.findIndex(
      (obj) => obj.docId.toHexString() === doc._id.toHexString()
    )

    if (reqType === 'delete') {
      if (categories) {
        categories.map((el, i) => {
          if (i === doc.commonProps.categoryIndex) {
            const docCategoryIndex = el.docs.findIndex(
              (obj) => obj.docId.toHexString() === doc._id.toHexString()
            )

            if (docCategoryIndex !== -1) {
              el.docs.splice(docCategoryIndex, 1)
            }
          }
        })
        if (docRecentIndex !== -1) {
          recent.docs.splice(docRecentIndex, 1)
        }
      }
    }

    if (reqType === 'create') {
      categories?.map((el, i) => {
        if (i === doc.commonProps.categoryIndex) {
          el.docs.push(docToAdd)
        }
        if (recent.docs.length === recent.lengthAllowed) {
          recent.docs.pop()
        }
      })
      recent.docs.unshift(docToAdd)
    }

    if (reqType === 'update') {
      console.log('WE FOUND IT', docRecentIndex)

      if (docRecentIndex !== -1) {
        recent.docs.splice(docRecentIndex, 1)
      }
      if (recent.docs.length <= recent.lengthAllowed) {
        recent.docs.pop()
      }
      recent.docs.unshift(docToAdd)
    }
  } catch (error) {
    console.error(error)
    return new AppError('Could not create or update doc', 404)
  }
}

export default codexOps
