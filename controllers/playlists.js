const callback = require('./login');
const requests = require('request');


exports.createPlaylist = (req, res, next) => {
    console.log(req.session.access_token);
    console.log(req.session.bod_id);
    var options = {
        url: `https://api.spotify.com/v1/users/${req.session.bod_id}/playlists`,
        headers: { 'Authorization': 'Bearer ' + req.session.access_token,},
        body: JSON.stringify({
            name: "new playlist",
            description: "First created spotify",
            public: false 
          }),
        json: true
      };

      requests.post(options, function(error, response, body) {
        console.log(body);
    });

}