const Collection = require("../models/Collection.model");
const User = require("../models/User.model");
const router = require("express").Router();

router.get('/collections', (req, res) => {
  const userId = req.payload._id

  User.findById(userId)
    .populate('collections')
    .then(userFromDb => {
      const collections = userFromDb.collections
      res.json({collections})
    })
})

router.post('/collection/create', (req, res, next) => {
  const {title, creator, createdFlashcards} = req.body 
  const userId = req.payload._id

  Collection.create({title, creator, flashcards: createdFlashcards})
    .then(createdCollection => {
      console.log(createdCollection);

      User.findOneAndUpdate({_id: userId}, { $push: {collections: createdCollection._id}})
        .then(response => {
          const { username, collections } = response
          console.log(`${username} collections array looks like that: ${collections}`)
        })

      res.status(201).json({
        message: 'Collection created successfully',
        collection: createdCollection
      });
    })
    .catch(err => next(err))
})

module.exports = router;