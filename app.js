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
    collection: 'sessions', //create new collection on the server called sessions
    expirationDate: {
        type: Date,
        expires:0
    },
    createdAt: { type: Date, expires: 3600 }
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

mongoc(client => {
    app.listen(8888);
});
app.use(
    session({secret: 'my secret', resave: false, saveUninitialized:false, expireAfterSeconds: 3600, store: store}) //secret encodes the session id
); //Right now this is storing the session immediately which is messing up subsequent calls from the event loop. 


app.use(login.routes);


app.use(playlist.routes);

app.use(token.routes);


app.use('*', (req,res) => {
    res.render(path.join(__dirname, 'views', '404.html')); //default path in case endpoint in
})





