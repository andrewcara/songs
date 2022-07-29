const express = require('express');
const login = require('./routes/route');
const playlist = require('./controllers/playlists')
const path = require('path');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);

app = express();
const mongoc = require('./util/database');

const MONGOURI= 'mongodb+srv://acarava3:Tottenh%40m124@cluster0.ojpaa.mongodb.net/?retryWrites=true&w=majority'; //mongoDB uri for our server

const store = new mongodbStore({
    uri: MONGOURI,
    collection: 'sessions' //create new collection on the server called sessions
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


mongoc(client => {
    app.listen(8888);
});
app.use(
    session({secret: 'my secret', resave: false, saveUninitialized:false, store: store}) //secret encodes the session id
);

app.use(login.routes);


app.use(playlist.createPlaylist);
app.use('*', (req,res) => {
    res.render(path.join(__dirname, 'views', '404.html'));
})





