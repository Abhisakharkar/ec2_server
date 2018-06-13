var update_retailer_profile_data = function(req, res) {
  var mysql = require('mysql');
  var enterpriseName = req.body.enterpriseName;
  var mobileNo = req.body.mobileNo;
  var addLine1 = req.body.addLine1;
  var addLine2 = req.body.addLine2;
  var city = req.body.city;
  var state = req.body.state;
  var country = req.body.country;
  var proprietor = req.body.proprietor;
  var latLoc = req.body.latLoc;
  var longLoc = req.body.longLoc;
  var mail = req.body.mail;
  var password = req.body.password;

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
      var sql = "SELECT * FROM RETAILER_AUTH WHERE mail=? AND password=?";
      con.query(sql, [mail, password], function(err, rows) {
        if (err) {
          console.log("err");
          console.log("no user found");
          var myobj = {
            responseFrom: "update_retailer_data",
            userFound:false
          }
          res.end(JSON.stringify(myobj));
          console.log("error in sql query in update retailer data");
        } else {
          retailerId = rows[0].retailerId;
          var sql = "UPDATE `RETAILER_DATA` SET `enterpriseName` = ?, `mobileNo` = ?, `addLine1` = ?, `addLine2` = ?, `city` = ?, `state` = ?, `country` = ?, `proprietor` = ?, `latLoc` = ?, `longLoc` = ? WHERE `RETAILER_DATA`.`retailerId` = ? "
          con.query(sql, [enterpriseName, mobileNo, addLine1, addLine2, city, state, country, proprietor, latLoc, longLoc, retailerId], function(err, rows) {
            if (err) {
              console.log(err);
              var myobj = {
                responseFrom: "update_retailer_profile_data",
                update: false
              }
              res.end(JSON.stringify(myobj));
            } else {
              var myobj = {
                responseFrom: "update_retailer_profile_data",
                update: true
              }
              res.end(JSON.stringify(myobj));
            }
          });
        }
      });
    }
  });
}
module.exports = update_retailer_profile_data;
