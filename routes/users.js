var express = require('express');
const user = require('../controllers/user');
var router = express.Router();

var [getUsers, addUsers] = require('../controllers/user');

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const users = await getUsers(req.body);
  res.json( {
    success: (users!=null)?true:false,
    message: (users!=null)?'Authentication successful!':'Authentication falied!',
    token: users
  } );
});



module.exports = router;
