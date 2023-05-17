const Collection = require("../models/Collection.model");
const router = require("express").Router();

router.get('/search/:query', (req, res, next) => {
  const query = req.params.query;

  Collection.find({ $text: { $search: query } })
    .sort({ score: { $meta: 'textScore' } })
    .exec()
    .then(collections => {
      res.json(collections);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;