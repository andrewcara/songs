const express  =require('express')

//This file can be added to the "refresh-token-shell.js". It makes more sense for the flow

// adding songs to spotify playlist
//Weekly calls. Would add if(uris) as a condition so that post requests were only issued when there are songs to add
var request = require('request');
var authOptions1 = {
   url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
   body: JSON.stringify({
     "uris": ['spotify:track:0cFlXjTxFdMGGPfLVpt3Wv'] //array of strings that specify a spotify song - this is a test one
   }),
   dataType:'json',
   headers: {
       'Authorization': 'Bearer ' + access_token,//cannot make any requests to the spotify api without access_token
       'Content-Type': 'application/json',
   }
};

request.post(authOptions1, function(error, response, body) {
   console.log(body);
});