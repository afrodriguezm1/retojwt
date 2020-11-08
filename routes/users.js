var express = require('express');
const auth = require('../lib/utils/auth.js');
var router = express.Router();

var [getUsers, addUsers] = require('../controllers/user');
var [getMsg, addUsers] = require('../controllers/mensaje');

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const users = await getUsers(req.body);
  res.json( {
    success: (users!=null)?true:false,
    message: (users!=null)?'Authentication successful!':'Authentication falied!',
    token: users
  } );
});

router.get('/mensajes', auth.getMsgs, async function(req, res, next) {
  const resp = await getMsg();
  res.send(resp);
})


module.exports = router;
