const { Schema, model } = require("mongoose")
const Flashcard = require("./Flashcard.model")

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
collectionSchema.index({ title: 'text' }); // Add text index on the 'title' field

const Collection = model('Collection', collectionSchema)

module.exports = Collection
