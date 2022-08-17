//here we are creating a function that will use the current session from the browser and see if it exists in the database

const findSession = (dbo, id) => {
    var query = { _id: id }; //map the value in the db to the session id
    
    return new Promise(function (resolve, reject) { //made the function a promise that is resolved if the record that is retrieved from mongoDB is valid
        dbo.db.db('test').collection("sessions").find(query).toArray(function (err, result) { //query the database based on the session id
            if (err) throw err;
            
            var statusConn = result
            dbo.db.close(); //close DB connection
            
            if (statusConn === undefined || statusConn.length == 0) { //conditional statement that determines whether or not the query returns anything
                reject()
            }
            else {
                resolve(statusConn) //here the promise returns the retrieved record if there is one
            }
    
        })

    })

}

module.exports = findSession