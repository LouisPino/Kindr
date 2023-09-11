var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/users")


router.post('/', userCtrl.addUser);
router.put('/', userCtrl.updateUser);
router.get('/challenges/:id', userCtrl.findUsersByCompletedChalleneges);
router.get('/:email', userCtrl.findUserByEmail);

module.exports = router;
