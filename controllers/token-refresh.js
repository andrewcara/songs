const requests = require('request');
const path = require('path');
const session = require('express-session');

exports.refreshToken = (req, res, next) => {
   var refresh_token = req.session.refresh_token;
   var authOptions = {
     url: 'https://accounts.spotify.com/api/token',
     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
     form: {
       grant_type: 'refresh_token',
       refresh_token: req.session.refresh_token
     },
     json: true
   };
 
   requests.post(authOptions, function(error, response, body){
    if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        req.session.access_token = access_token;
        res.locals.access_token = access_token;
        console.log(req.session.access_token)
        res.redirect('/create-playlist'); //must use res.render to send a res.locals variable in ejs to the html page
    }
   })
};