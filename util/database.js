const mongodb = require('mongodb').MongoClient;;


const mongoc = callback =>  {
    mongodb.connect('mongodb+srv://acarava3:Tottenh%40m124@cluster0.ojpaa.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};


module.exports = mongoc;
