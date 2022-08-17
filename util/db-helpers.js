//here we are creating a function that will use the current session from the browser and see if it exists in the database

const findSession = (dbo,id) => { 

    var query = { _id: id }; //map the value in the db to the session id
    dbo.db.db('test').collection("sessions").find(query).toArray(function(err, result) { //query the database based on the session id
    if (err) throw err;
    console.log(result);
    dbo.db.close();
  });

}

module.exports = findSession