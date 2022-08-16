const mongodb = require('mongodb').MongoClient;;


const mongoc = (callback) =>  { //takes a callback function
    mongodb.connect('mongodb+srv://acarava3:Tottenh%40m124@cluster0.ojpaa.mongodb.net/?retryWrites=true&w=majority')
    .then(client => { //connect returns a promise with a client object if succesful or an error object if not
        console.log('connected');
        callback(client); // callback is only called once DB is connected. In this case the port 8888 does not listen until a db connection is established
    })//function has access to the client object
    .catch(err => {
        console.log(err);
    });
};


module.exports = mongoc;
