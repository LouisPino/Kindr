var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/users")
const multer = require("multer");
const upload = multer();
/* GET users listing. */
router.post('/', userCtrl.addUser);
router.put('/', userCtrl.updateUser);
router.get('/challenges/:id', userCtrl.findUsersByCompletedChalleneges);
router.get('/:email', userCtrl.findUserByEmail);
router.post('users/profile-photo',  upload.single("imageUpload"), userCtrl.uploadPhoto)

router.get("/test", (req, res)=>{
    console.log('hit me')
    res.send('success')
})

module.exports = router;
