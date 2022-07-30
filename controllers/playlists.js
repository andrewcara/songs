const requests = require('request');


exports.createPlaylist = (req, res, next) => {
    
    
    //console.log(req.session.access_token);
    //console.log(req.session.bod_id);

    if (req.session.access_token){
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
            console.log(body.error.status);
        });
}

        else {
            res.redirect('/login')
        }

}