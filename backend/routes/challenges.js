var express = require('express');
var router = express.Router();
const challengeCtrl = require("../controllers/challenges")


router.get('/', challengeCtrl.index);
router.get('/daily', challengeCtrl.createDailyChallenge);

router.post('/', challengeCtrl.create);
router.post('/findbyid', challengeCtrl.findChallengesByIds);

router.put('/:id', challengeCtrl.update)



module.exports = router;
