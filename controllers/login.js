const path = require('path');
const querystring = require('querystring');
const request = require('request');


const redirect_uri = 'http://localhost:8888/callback';

client_id = process.env.SPOTIPY_CLIENT_ID
client_secret = process.env.SPOTIPY_CLIENT_SECRET
client_id = client_id.replace(/\s/g, '');
client_secret = client_secret.replace(/\s/g, '');

// const client_id = 'daf925983160411786bc9afd3c8db891';
// const client_secret = '2be54995915c4bd197d6d85650faf39d';


var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

exports.getLogin= (req,res,next)=>{

    
    res.render(path.join(__dirname, '../', 'views', 'index.html')); //holds the absolute path on this operating system
      
     //data becomes inherent to node server. Usually not the best way to handle requests as it shows for all users
}; 

exports.loginRedirect  = (req, res, next) => {
    

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    
      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
    
};

exports.AuthLogin = (req, res) => {

    var scope = "streaming \
                 user-read-email \
                 user-read-private"
  
    var state = generateRandomString(16);
  
    var auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: "http://localhost:8888/callback",
      state: state
    })
  
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
  }

exports.Callback = (req, res, next) =>{
    
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;    var code = req.query.code || null;
    var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'

      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
      
    };
    
  }
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var access_token = body.access_token,
          refresh_token = body.refresh_token;
      req.access_token = access_token;
      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, (error, response, bod) => {
        res.locals.bod = bod;
        res.locals.access_token = access_token; //this is making the body of the login response and the access token local variables that can be accessed later
        req.session.acces_token = access_token
        res.setHeader('Set-Cookie', `Access-Token: ${access_token}; HttpOnly`); //we can store the access token in a cookie
        res.render(path.join(__dirname, '../', 'views', 'user.html')); //res.locals do not have to be specified here
      });


      // we can also pass the token to the browser to make requests from there
    } else {
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });

};


