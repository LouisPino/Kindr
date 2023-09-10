var express = require('express');
var router = express.Router();
const challengeCtrl = require("../controllers/challenges")

/* GET home page. */
router.get('/', challengeCtrl.index);
router.get('/daily', challengeCtrl.createDailyChallenge);
// router.get('/daily', (req, res) => {
//   res.send('test')
// });
router.post('/', challengeCtrl.create);
router.post('/findbyid', challengeCtrl.findChallengesByIds);
// router.put('/', challengeCtrl.update)
router.put('/', (req, res) => {
  res.send('test')
});



module.exports = router;
