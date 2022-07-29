const express = require('express');
const login = require('./routes/route');
const playlist = require('./controllers/playlists')
const path = require('path');
const session = require('express-session');

app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.use(
//     session({secret: 'my secret', resave: false, saveUninitialized:false})
// );

app.use(login.routes);

//we can create a middleware function here that assigns the access_token and refresh token to the request body from the client

// app.use((req, res, err) =>{
//     find(Access_token)
//     .then(access_token => {
//         req.access_token = access_token;
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

app.use(playlist.createPlaylist);
app.use('*', (req,res) => {
    res.render(path.join(__dirname, 'views', '404.html'));
})




app.listen(8888);
