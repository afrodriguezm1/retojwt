const { mongoUtils, dataBase } = require('../lib/utils/mongo.js');

function getMsg() {
  return mdbconn.conn().then((client) => {
    return client.db('isis3710').collection('messages').find({}).toArray();
  });
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