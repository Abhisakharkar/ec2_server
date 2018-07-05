var check_device_id = function (req,res,authData) {
  var mysql = require('mysql');
  var retailerId = authData.data.retailerId;
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
      var sql = "SELECT deviceId FROM `RETAILER_AUTH` WHERE `RETAILER_AUTH`.`retailerId` = ? ";
      con.query(sql, [retailerId], function(err, rows) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          var myobj = {
            responseFrom: "check_device_id", // also  kept same for sign in
            deviceId:rows[0].deviceId;
          }
          res.send(JSON.stringify(myobj));
        }
      }); // select retailer from retailer_auth

    }

  });
}
module.exports=check_device_id;
