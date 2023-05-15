const { Schema, model } = require("mongoose");

const learnSessionSchema = new Schema(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    },
    correctAnsweredFlashcards: [
      {
        type: Object,
      }
    ],
    wrongAnsweredFlashcards: [
      {
        type: Object
      }
    ],
    correctCount: Number,
    wrongCount: Number,
    accuracy: Number
  },
  {
    timestamps: true
  }
)
const LearnSession = model('LearnSession', learnSessionSchema)
module.exports = LearnSession