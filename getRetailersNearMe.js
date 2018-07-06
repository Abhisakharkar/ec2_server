var get_retailers_near_me = function (req,res) {

  var con= require('./databaseOptions')
  if (req.body.localityId==null){
    res.sendStatus(404);
  }
  con.connect(function(err) {
    if (err) {
      console.log(err);
      console.log("error in database connection");
    } else {
      console.log("Connected to database!");
      makeQueryForGetRetailerNearMe=require('./makeQueryForGetRetailerNearMe');
      var queryData=makeQueryForGetRetailerNearMe.makeQuery(req);
      var updateVariables=queryData.updateVariables;
      var variablesValues=queryData.variablesValues;
      var updateData=queryData.updateData;
      console.log(updateVariables);
      console.log(variablesValues);
      var sql = "SELECT `retailerId`, `enterpriseName`, `mobileNo`, `shopPhoto`, `subLocality1Id`, `localityId`, `latloc`, `longloc`, `deliveryStatus` FROM `RETAILER_DATA` WHERE "+updateVariables;
      con.query(sql,variablesValues, function(err, rows) {
        if (err) {
          console.log("error");;
        }
        else {
          var myObj={
            retailers:rows
          }
          res.send(JSON.stringify(myObj));
        }
      });
    }
  });
}
module.exports=get_retailers_near_me;
