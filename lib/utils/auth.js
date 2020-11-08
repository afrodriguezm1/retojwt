const jwt = require('jsonwebtoken');
const secret = process.env.DB_SECRET;

const createToken = (data) =>{

    return jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: '1h'});
}

exports.createToken = createToken;