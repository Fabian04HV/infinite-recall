const { Schema, model } = require("mongoose")

const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    flashcards: [{
      type: Schema.Types.ObjectId,
      ref: 'Flashcard'
    }]
  },
  {
    timestamps: true
  }
)

const Collection = model('Collection', collectionSchema)
module.exports = Collection