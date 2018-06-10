var update_device_id = function(req, res) {
  var mysql = require('mysql');
  var retailerId = req.body.retailerId;
  var deviceId = req.body.deviceId;

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
        var sql = "UPDATE `RETAILER_AUTH` SET `deviceId` = ? WHERE `RETAILER_AUTH`.`retailerId` = ? ";
        con.query(sql, [deviceId, retailerId], function(err, result) {
          if (err) {
            console.log(err);
            console.log("error in device id update");
            var myobj = {

              update: false
            }
            res.send(JSON.stringify(myobj));
          } else {
            console.log("device id updated");
            var sql = "SELECT * FROM `RETAILER_AUTH` WHERE `RETAILER_AUTH`.`retailerId` = ? ";
            con.query(sql, [retailerId], function(err, rows) {
              if (err) {
                console.log(err);
                res.send("error");
              } else {
                var myobj = {
                  signIn: true,
                  deviceIdUpdate: true,
                  responseFrom: "sign_in", // also  kept same for sign in
                  retailerAuthTable: rows[0]
                }
                res.send(JSON.stringify(myobj));
              }
            }); // select retailer from retailer_auth
          }

        }); // update device id
      }
    });


}
module.exports = update_device_id;
