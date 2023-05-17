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
  const { title, createdFlashcards } = req.body;
  const flashcards = createdFlashcards
  const userId = req.payload._id;
  const creator = req.payload.username

  if(flashcards.length > 3000){
    res.status(403).json({ message: "You cannot create a collection with more than 3000 flashcards." })
    return
  }

  if(title.length > 50){
    res.status(400).json({ message: "Collection Title is too long." })
    return
  }

  // Check flashcards for length
  for (const flashcard of flashcards) {
    if (flashcard.front.length > 500 || flashcard.back.length > 500) {
      res.status(422).json({ message: "Your flashcards cannot have more than 500 characters." });
      return;
    }
  }
  
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

router.put('/collection/edit', (req, res, next) => {
  const {title, createdFlashcards, editId} = req.body 
  const username = req.payload.username 

  Collection.findById(editId)
    .then((collection) => {
      if(username !== collection.creator){
        res.status(403).json({message: 'You are not the owner of this Collection!'})
        return
      }
      else{
        const newCollection = []
        let flashcardPromises = []
      
        createdFlashcards.map(flashcard => {
          if(!flashcard._id){
            flashcardPromises.push(
            Flashcard.create(flashcard))
          }
          else{
            flashcardPromises.push(Flashcard.findByIdAndUpdate(flashcard._id, flashcard))
          }
        })
      
        Promise.all(flashcardPromises)
        .then(response => {
          response.map(card => {
            newCollection.push(card._id)
          })
          Collection.findByIdAndUpdate(editId, {title, flashcards: newCollection})
            .then((response) => {
              res.json({collection: response})
            })
            .catch(err => console.log(err))
      
        })
      }
    })
})

router.delete('/collection/delete/:id', (req, res, next) => {
  const collectionId = req.params.id 
  const username = req.payload.username 

  Collection.findById(collectionId)
    .then((collection) => {
      if(username !== collection.creator){
        res.status(403).json({message: 'You are not the Owner of this Collection! 😈'})
        return
      }
      else{
        Collection.findByIdAndDelete(collectionId)
        .then(() => {
          res.json({message: 'Delete Successful'})
        })
        .catch(err => console.log(err))
      }
    })  
})

module.exports = router;