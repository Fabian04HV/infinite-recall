const Collection = require("../models/Collection.model");
const User = require("../models/User.model");
const router = require("express").Router();

router.get('/data', (req, res) => {
  res.json({data:'This is a Test message from the Server'})
})

router.post('/collection/create', (req, res, next) => {
  const {title, creator, createdFlashcards, user} = req.body 

  console.log('USER FROM REQ BODY: ', user)

  Collection.create({title, creator, flashcards: createdFlashcards})
    .then(createdCollection => {
      console.log(createdCollection);

      User.findOneAndUpdate({_id: user._id}, { $push: {collections: createdCollection._id}})
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