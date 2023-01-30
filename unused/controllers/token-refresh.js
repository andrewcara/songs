const requests = require('request');
const path = require('path');
const { Connection } = require('../util/database')
const findSession = require('../util/db-helpers')


exports.refreshToken = (req, res, next) => {
   
  findSession(Connection, req.session.id)
   .then(config =>{ //in this case the promise returns the record which we can access with config
    //If the promise is resolved and the session id can be verified, the refresh token request will be made using the information below
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
   })
   .catch(err=>{
    res.render(path.join(__dirname, '../', 'views', 'noSession.html')); //if the promise is rejected, we will render an error html page
   })
  
};