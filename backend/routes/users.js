var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/users")

/* GET users listing. */
router.post('/', userCtrl.addUser);

router.get("/test", (req, res)=>{
    console.log('hit me')
    res.send('success')
})

module.exports = router;
