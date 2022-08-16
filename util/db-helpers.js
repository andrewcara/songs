

const findSession = (db,id,cb) => {

    var query = { id_: id };
    dbo.collection("sessions").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });

  cb();

}

exports.findSession = findSession
