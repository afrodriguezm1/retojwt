const { mongoUtils, dataBase } = require('../lib/utils/mongo.js');
const auth = require('../lib/utils/auth.js');
const COLLECTION_NAME = 'messages';


async function getMsg() {

    const client = await mongoUtils.conn();
    const msgs = await client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .find( {})
        .toArray()
        .finally(()=> client.close());

    return msgs;
  
}

function insertMsg(product) {
  return mdbconn.conn().then((client) => {
    return client.db('isis3710').collection('messages').insertOne(product); // Si no se provee un ID, este será generado automáticamente
  });
}

function updateMsg(id, product) {
    return mdbconn.conn().then((client) => {
      return client.db('isis3710').collection('messages').updateOne({_id: parseInt(id)}, {$set: {author: product.author, message: product.message}}); // Si no se provee un ID, este será generado automáticamente
    });
}


function deleteMsg(id) {
return mdbconn.conn().then((client) => {
    return client.db('isis3710').collection('messages').deleteOne({ _id: parseInt(id)}); // Si no se provee un ID, este será generado automáticamente
});
}

module.exports = [getMsg, insertMsg, updateMsg, deleteMsg];