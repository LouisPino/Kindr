var express = require('express');
var router = express.Router();
const challengeCtrl = require("../controllers/challenges")

/* GET home page. */
router.get('/', challengeCtrl.index);
router.get('/daily', (req, res) => {
  res.send('hi')
});
router.post('/', challengeCtrl.create);


module.exports = router;
