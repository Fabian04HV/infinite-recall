const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Collection'
      }
    ],
    learnSessions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LearnSession'
      }
    ],
    answerHistory: [
      {
        collectionId: {
          type: Schema.Types.ObjectId,
          ref: 'Collection'
        },
        flashcardHistory: [
          {
            flashcard: {
              type: Schema.Types.ObjectId,
              ref: 'Flashcard'
            },
            history: []
          }
        ]
      }
    ]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);
module.exports = User;