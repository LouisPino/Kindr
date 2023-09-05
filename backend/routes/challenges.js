var express = require('express');
var router = express.Router();
const challengeCtrl = require("../controllers/challenges")

/* GET home page. */
router.get('/', challengeCtrl.create);

module.exports = router;
