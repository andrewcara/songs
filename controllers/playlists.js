const requests = require('request');
const path = require('path');
const session = require('express-session');


exports.createPlaylist = (req, res, next) => {
    
        var options = {
            url: `https://api.spotify.com/v1/users/${req.session.user_id}/playlists`,
            
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
            const tempPlaylist = body.uri.split(":"); //example response - spotify:playlist:2d0gkKNytoyBS8Nx1tuCE0 the uri is returned in response to the post request
            req.session.playlist_id = (tempPlaylist[2]); //adding the playlist to the session
            res.render(path.join(__dirname, '../', 'views', 'created-playlist.html'), {playlist: req.session.playlist_id});

            // //if (body.error.status === 403){
            //     res.redirect('/refresh-token'); //need to add this endpoint to get a refresh token if the one we are using expires
            // }
        });


}
// adding songs to spotify playlist
 
exports.addToPlaylist = (req,res,next) => {
    //Weekly calls. Would add if(uris) as a condition so that post requests were only issued when there are songs to add
   var request = require('request');
       var authOptions1 = {
           url: `https://api.spotify.com/v1/playlists/${req.session.playlist_id}/tracks`,
           body: JSON.stringify({
             "uris": ['spotify:track:0cFlXjTxFdMGGPfLVpt3Wv'] //array of strings - this is a test one
           }),
           dataType:'json',
           headers: {
               'Authorization': 'Bearer ' + req.session.access_token, //cannot make any requests to the spotify api without access_token
               'Content-Type': 'application/json',
           }
       };
 
       request.post(authOptions1, function(error, response, body) {
           console.log(body);
       });
}