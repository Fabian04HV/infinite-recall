const Collection = require("../models/Collection.model");
const Flashcard = require("../models/Flashcard.model");
const User = require("../models/User.model");
const router = require("express").Router();

router.get('/collections', (req, res, next) => {
  const userId = req.payload._id;

  User.findById(userId)
    .populate('collections')
    .populate({
      path: 'collections',
      populate: {
        path: 'flashcards'
      }
    })
    .then(userFromDb => {
      const collections = userFromDb.collections;
      console.log('COLLECTIONS RETURNED IN ROUTER GET REQUEST', collections)
      res.json({ collections });
    })
    .catch(err => next(err));
});

router.get('/collections/:id', (req, res, next) => {
  const collectionId = req.params.id 

  Collection.findById(collectionId)
    .populate('flashcards')
    .then(collectionFromDb => {
      res.json({collection: collectionFromDb})
    })
    .catch(err => next(err))
})

router.post('/collection/create', (req, res, next) => {
  const { title, creator, createdFlashcards } = req.body;
  const flashcards = createdFlashcards
  const userId = req.payload._id;
  
  if (Array.isArray(flashcards) && flashcards.length > 0) {
    Collection.create({ title, creator })
      .then(createdCollection => {
        const flashcardPromises = flashcards.map(flashcard => {
          return Flashcard.create(flashcard)
            .then(createdFlashcard => {
              return { _id: createdFlashcard._id, score: 0 };
            });
        });

        Promise.all(flashcardPromises)
          .then(flashcardsWithScores => {
            createdCollection.flashcards = flashcardsWithScores;
            return createdCollection.save();
          })
          .then(() => {
            return User.findOneAndUpdate({ _id: userId }, { $push: { collections: createdCollection._id } }, { new: true });
          })
          .then(response => {
            const { username, collections } = response;
            console.log(`${username} collections array looks like that: ${collections}`);
            res.status(201).json({
              message: 'Collection created successfully',
              collection: createdCollection
            });
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    const error = new Error("Invalid flashcards data");
    error.status = 400;
    next(error);
  }
});

module.exports = router;