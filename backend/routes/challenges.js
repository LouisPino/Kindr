var express = require('express');
var router = express.Router();
const challengeCtrl = require("../controllers/challenges")

/* GET home page. */
router.post('/', challengeCtrl.create);
router.get('/', challengeCtrl.index);

module.exports = router;
