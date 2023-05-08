const { Schema, model } = require("mongoose")

const flashcardSchema = new Schema(
  {
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
    },
    importance: {
      type: String,
      enum: ['low', 'normal', 'high']
    }
  },
  {
    timestamps: true
  }
)

const Flashcard = model('Flashcard', flashcardSchema)
module.exports = Flashcard