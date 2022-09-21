const requests = require('request');
const path = require('path');
const session = require('express-session');
const { Connection } = require('./Databases/db-connection')
const findSession = require('./Databases/db-helper')
const express = require('express');
const mongodbStore = require('connect-mongodb-session')(session);
client_id = 'daf925983160411786bc9afd3c8db891'
client_secret = '2be54995915c4bd197d6d85650faf39d'


const _id = "P1wIrQloy5ZQjtNyugmj8Kf-s5241E8g"
Connection.open().then(
    value=> {findSession(Connection, "P1wIrQloy5ZQjtNyugmj8Kf-s5241E8g")
    .then(config =>{ //in this case the promise returns the record which we can access with config
     //If the promise is resolved and the session id can be verified, the refresh token request will be made using the information below
     
     
     var authOptions = {
       url: 'https://accounts.spotify.com/api/token',
       headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
       form: {
         grant_type: 'refresh_token',
         refresh_token: config[0].session.refresh_token
       },
       json: true
     };
   
     requests.post(authOptions, function(error, response, body){
       if (!error && response.statusCode === 200) {
           var access_token = body.access_token;
           Connection.db.db('test').collection("sessions").updateOne({ _id: _id }, {$set:{"session.access_token":access_token}}, function(err, result) {
                console.log(result)
                console.log(err)
                Connection.db.close();
                //do something.
        });
           //must use res.render to send a res.locals variable in ejs to the html page
       }
     })
    })
    .catch(err=>{
         console.log(err) //if the promise is rejected, we will render an error html page
    })
   
 
 ;},
    function(err) {console.log(err);}
)

