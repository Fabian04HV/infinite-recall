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
        enum: ['high', 'normal', 'low'],
        default: 'normal'
      }
    }]
  },
  {
    timestamps: true
  }
);


const Collection = model('Collection', collectionSchema)
module.exports = Collection