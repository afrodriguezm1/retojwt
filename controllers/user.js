const { mongoUtils, dataBase } = require('../lib/utils/mongo.js');
const auth = require('../lib/utils/auth.js');
const COLLECTION_NAME = 'users';

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUsers(data) {
    const client = await mongoUtils.conn();
    const users = await client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .findOne( { "username": data.username})
        .finally(()=> client.close());

    if (users !== null) {
        let result = await bcrypt.compare(data.password, users.password)
        if (result === true){
            delete users.password;
            delete users._id
            let token = await auth.createToken(users);
            return token;
        }
        else {
            return null;
        }
    }
}

async function addUser(user) {
    return mongoUtils.conn().then((client) => {
        return client
            .db(dataBase)
            .collection(COLLECTION_NAME)
            .insertOne(user)
            .finally(()=> client.close());
    });
}

module.exports = [getUsers, addUser];