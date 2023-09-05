var express = require('express');
var router = express.Router();
const challengeCtrl = require("../controllers/challenges")

/* GET users listing. */
router.get('/:cid', challengeCtrl.show);

module.exports = router;