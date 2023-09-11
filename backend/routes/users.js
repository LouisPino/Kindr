var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/users")


router.post('/', userCtrl.addUser);
router.put('/', userCtrl.updateUser);
router.get('/challenges/:id', userCtrl.findUsersByCompletedChalleneges);
router.get('/:email', userCtrl.findUserByEmail);

router.get("/test", (req, res)=>{
    console.log('hit me')
    res.send('success')
})

module.exports = router;
