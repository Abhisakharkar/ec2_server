var update_full_retailer_data = function (req,res,authData) {
  var mysql = require('mysql');
  var retailerId=authData.data.retailerId;
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MH31eh@2964",
    database: "hoverBackend"
  });

  con.connect(function(err) {
    if (err) {
      console.log(err);
      console.log("error in database connection");
    } else {
      console.log("Connected to database!");
      makeQueryForRetailerDataUpdate=require('./makeQueryForRetailerDataUpdate');
      var queryData=makeQueryForRetailerDataUpdate.makeQuery(req);
      var updateVariables=queryData.updateVariables;
      var variablesValues=queryData.variablesValues;
      var updateData=queryData.updateData;
      variablesValues.push(retailerId);
      var sql = "UPDATE `RETAILER_DATA` SET "+updateVariables+" WHERE retailerId=?";
      con.query(sql,variablesValues, function(err, rows) {
        if (err) {
          console.log(err);
          var myobj = {
            responseFrom: "update_full_retailer_data",
            update: false
          }
          console.log(myobj);
          res.end(JSON.stringify(myobj));
        } else {
          var myobj = {
            responseFrom: "update_full_retailer_data",
            update: true,
            updateData:updateData
          }
         console.log(myobj);
         res.end(JSON.stringify(myobj));
        }
      });

    }
  });

}

module.exports=update_full_retailer_data;






  // var req={
  //   body:{
  //
  //     enterpriseName:'bckshbvc',
  //     mobileNo:535485424,
  //     addLine1:'kuhzdbfkuf',
  //     sublocality1Id:1,
  //     localityId:7,
  //     proprietor:'hbmhzsbc',
  //     latloc:75.8776,
  //     longloc:67.8978,
  //     deliveryStatus:0,
  //     maxDeliveryDistanceInMeters:566,
  //     maxFreeDeliveryDistanceInMeters:867,
  //     chargePerHalfKiloMeterForDelivery:15.25,
  //     openCloseIsManual:0,
  //     shopOpenTime1:'09:33:35',
  //     shopCloseTime1:'09:33:35',
  //     shopOpenTime2:'09:33:35',
  //     shopCloseTime2:'09:33:35',
  //      currentState:0
  //
  //   }
  // }
