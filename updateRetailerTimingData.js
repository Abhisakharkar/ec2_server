var update_retailer_timing_data=function (req,res) {
  var mysql = require('mysql');
  var openCloseIsManual = req.body.openCloseIsManual;
  var shopOpenTime1 = req.body.shopOpenTime1;
  var shopOpenTime2 = req.body.shopOpenTime2;
  var shopCloseTime1 = req.body.shopCloseTime1;
  var shopCloseTime2 = req.body.shopCloseTime2;
  var currentState = req.body.currentState;
  var lastStatusUpdate = req.body.lastStatusUpdate;
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
          var sql = "UPDATE `RETAILER_DATA` SET `openCloseIsManual` = ?, `shopOpenTime1` = ?, `shopOpenTime2` = ?, `shopCloseTime1` = ?, `shopCloseTime2` = ?, `currentState` = ?, `lastStatusUpdate` = ? WHERE `RETAILER_DATA`.`retailerId` = ?"
          con.query(sql, [openCloseIsManual,shopOpenTime1,shopOpenTime2,shopCloseTime1,shopCloseTime2,currentState,lastStatusUpdate, retailerId], function(err, rows) {
            if (err) {
              console.log(err);
              var myobj = {
                responseFrom: "update_retailer_timing_data",
                update: false
              }
              res.end(JSON.stringify(myobj));
            } else {
              var myobj = {
                responseFrom: "update_retailer_timing_data",
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
module.exports=update_retailer_timing_data;
