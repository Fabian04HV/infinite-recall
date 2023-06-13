const User = require("../models/User.model");
const router = require("express").Router();

router.get('/user/:id', (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
  .then(userFromDb => {
    const { _id, email, username, collections, learnSessions, createdAt, answerHistory } = userFromDb
    res.json({ userInfo: { _id, email, username, collections, learnSessions, createdAt, answerHistory }})
  })
})


module.exports = router;