var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/users")

/* GET users listing. */
router.get('/', userCtrl.addUser);

module.exports = router;
