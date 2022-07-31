const requests = require('request');


exports.createPlaylist = (req, res, next) => {
    
    
    console.log(req.session.access_token);
    console.log(req.session.bod_id);

        var options = {
            url: `https://api.spotify.com/v1/users/${req.session.bod_id}/playlists`,
            
            body: JSON.stringify({
                "name": "new playlist",
                "description": "First created spotify",
                "public": true 
            }),

            
            dataType: 'json',

            headers: { 'Authorization': 'Bearer ' + req.session.access_token , 'Content-Type': 'application/json',},
        };

        requests.post(options, function(error, response, body) {
            
            body = JSON.parse(body);

            if (body.error.status === 403){
                res.redirect('/refresh-token'); //need to add this endpoint to get a refresh token if the one we are using expires
            }
        });


}

