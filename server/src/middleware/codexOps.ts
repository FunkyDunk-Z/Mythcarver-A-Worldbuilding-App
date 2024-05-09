import { Types } from 'mongoose'

// Models
import { Codex } from '../models/codexModel'
import { DocType } from '../models/docSchema'
import { Category } from '../models/categoryModel'
import { CommonSchemaType } from '../models/commonSchema'

// Utils
import AppError from '../util/appError'

interface PropTypes {
  commonProps: CommonSchemaType
  id: Types.ObjectId
  reqType: 'create' | 'update' | 'delete'
}

const codexOps = async ({ id, commonProps, reqType }: PropTypes) => {
  try {
    const {
      codexId,
      categoryId,
      // modelRef,
      thumbnail,
      docName,
      docType,
      docSubType,
    } = commonProps

    console.log(commonProps)

    const docToAdd: DocType = {
      docId: id,
      // modelRef,
      thumbnail,
      docName,
      docType,
      docSubType,
      categoryUrl: '',
    }
    const recentMaxLength = 5

    const codex = await Codex.findById(codexId)

    if (!codex) {
      return new AppError('No codex found with that ID', 404)
    }
    const { recent } = codex

    const category = await Category.findById(categoryId)
    if (category) {
      docToAdd.categoryUrl = category.categoryUrl
    }

    if (!category) {
      return new AppError('No category found with that ID', 404)
    }

    // Remove doc from array
    const spliceArray = (array: DocType[]) => {
      const index = array.findIndex(
        (obj) => obj.docId.toHexString() === id.toHexString()
      )

      if (index !== -1) {
        array.splice(index, 1)
      }
    }

    // Remove last doc from array
    const popRecent = () => {
      if (recent.length === recentMaxLength) {
        recent.pop()
      }
    }

    // Add doc to array
    const pushCategory = () => {
      category.docs.push(docToAdd)
    }

    // Add doc to begining of array
    const unshiftRecent = () => {
      recent.unshift(docToAdd)
    }

    if (reqType === 'delete') {
      if (category) {
        spliceArray(category.docs)
      }
      spliceArray(recent)
    }

    if (reqType === 'create') {
      pushCategory()
      popRecent()
      unshiftRecent()
    }

    if (reqType === 'update') {
      if (category) {
        spliceArray(category.docs)
        pushCategory()
      }
      spliceArray(recent)
      popRecent()
      unshiftRecent()
    }

    await category.save()
    await codex.save()
  } catch (error) {
    console.error(error)
    return new AppError('Could not create or update doc', 404)
  }
}

export default codexOps
