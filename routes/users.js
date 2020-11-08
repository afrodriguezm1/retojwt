var express = require('express');
const user = require('../controllers/user');
var router = express.Router();

var [getUsers, addUsers] = require('../controllers/user');

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const users = await getUsers(req.body);
  res.json( {
    success: true,
    message: 'Authentication successful!',
    token: users
  } );
});



module.exports = router;
