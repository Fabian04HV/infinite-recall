const Collection = require("../models/Collection.model");
const Flashcard = require("../models/Flashcard.model");
const LearnSession = require("../models/LearnSession.model");
const User = require("../models/User.model");
const router = require("express").Router();

const { ObjectId } = require("mongoose");

router.get('/statistics/:collectionId', (req, res, next) => {
  const collectionId = req.params.collectionId;
  const userId = req.payload._id;

  User.findOne({ _id: userId })
    .populate('learnSessions')
    .then(userFromDb => {
      const { learnSessions } = userFromDb;
      const collectionLearnSessions = learnSessions.filter(session => session.collectionId.toString() === collectionId);
 
      res.json({ collectionLearnSessions });
    })
    .catch(err => {
      res.json({ message: err });
    });
});


router.put('/save-statistics', (req, res, next) => {
  const userId = req.payload._id
  const { correctFlashcards, wrongFlashcards, collectionId, correctCount, wrongCount, accuracy } = req.body
  if(userId){
    LearnSession.create({ correctAnsweredFlashcards: correctFlashcards, wrongAnsweredFlashcards: wrongFlashcards, collectionId, correctCount, wrongCount, accuracy })
    .then(createdLearnSession => {
      User.findByIdAndUpdate(
        userId,
        { $push: { learnSessions: createdLearnSession._id } }, // Push the session ID to the learnSessions array
        { new: true }
      )
      .then(updatedUser => {
        res.json({ createdLearnSession: createdLearnSession, updatedUser });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update user with learn session' });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Failed to create learn session' });
    });
  }
})

router.put('/saveAnswerInFlashcardHistory', (req, res, next) => {
  const { collectionId, flashcardId, isCorrect } = req.body;
  const userId = req.payload._id;

  User.findById(userId)
    .then(user => {
      const answerHistoryEntry = user.answerHistory.find(entry =>
        entry.collectionId.equals(collectionId)
      );

      if (answerHistoryEntry) {
        const flashcardHistoryEntry = answerHistoryEntry.flashcardHistory.find(
          entry => entry.flashcard.equals(flashcardId)
        );

        if (flashcardHistoryEntry) {
          flashcardHistoryEntry.history.push(isCorrect);
        } else {
          answerHistoryEntry.flashcardHistory.push({
            flashcard: flashcardId,
            history: [isCorrect],
          });
        }
      } else {
        user.answerHistory.push({
          collectionId,
          flashcardHistory: [
            {
              flashcard: flashcardId,
              history: [isCorrect],
            },
          ],
        });
      }

      return user.save();
    })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/collectionAnswerHistory/:collectionId', (req, res, next) => {
  const collectionId = req.params.collectionId
  const userId = req.payload._id
  User.findById(userId)
  .then(userFromDb => {
    const answerHistory = userFromDb.answerHistory.find(entry => entry.collectionId.toString() === collectionId )
    console.log(userFromDb, answerHistory, userFromDb.answerHistory)
    res.json({ answerHistory: answerHistory})
  })

})

module.exports = router;