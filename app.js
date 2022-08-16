const express = require('express');
const login = require('./routes/route');
const playlist = require('./routes/playlist');
const token = require("./routes/tokens")
const path = require('path');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
app = express();
const mongoc = require('./util/database');

const MONGOURI= 'mongodb+srv://acarava3:Tottenh%40m124@cluster0.ojpaa.mongodb.net/?retryWrites=true&w=majority'; //mongoDB uri for our server

const store = new mongodbStore({
    uri: MONGOURI,
    collection: 'sessions', //create new collection called sessions
    
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

mongoc(client => { //accessing the client object from mongoc
    app.listen(8888);
    client.db('test').collection('sessions').findOne({}, function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result);
        client.close();
      });
});

app.use(session({
    secret  : "Stays my secret",
    cookie: {
        maxAge  : new Date(Date.now() + 3600000) //1 Hour
        //secure: true
        
    },
    store  :store
}));


app.use(login.routes);


app.use(playlist.routes);


app.use(token.routes);


app.use('*', (req,res) => {
    res.render(path.join(__dirname, 'views', '404.html')); //default path in case endpoint in
})





