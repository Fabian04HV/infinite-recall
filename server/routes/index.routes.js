const Collection = require("../models/Collection.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get('/data', (req, res) => {
  res.json({data:'This is a Test message from the Server'})
})

router.post('/collection/create', (req, res, next) => {
  const {title, creator} = req.body 

  Collection.create({title, creator})
    .then(createdCollection => {
      console.log(createdCollection);
      res.status(201).json({
        message: 'Collection created successfully',
        collection: createdCollection
      });
    })
    .catch(err => next(err))
})

module.exports = router;