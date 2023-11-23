const modelTimestamp = function (schema) {
  schema.add({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  })

  schema.pre('findOneAndUpdate', async function () {
    const docToUpdate = await this.model.findOne(this.getQuery())

    this.set({ updatedAt: Date.now() })

    return docToUpdate
  })
}

module.exports = modelTimestamp
