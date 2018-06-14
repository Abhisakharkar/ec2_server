var verify_mail = function(req, res) {
  var mail, password, code, retailerId;

  mail = req.body.mail;
  password = req.body.password;
  code = req.body.code;

  var mysql = require('mysql');

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
      console.log("database connected!!");
      var sql = 'SELECT * FROM `RETAILER_AUTH` WHERE `mail` = ? AND `password` = ?  AND `code`=?';
      con.query(sql, [mail, password, code], function(err, rows) {
        if (err) {
          console.log(err);
          console.log("query failed");
        } else {
          if (!rows.length) {
            var myobj = {
              verificationStatus: false,
              responseFrom: "verify_mail"
            }
            console.log("rows length is 0");
            res.send(JSON.stringify(myobj));
          } else {
            retailerId = rows[0].retailerId;
            var url_lp= '/private/'+retailerId+'/lp.jpeg';
            var sql = "UPDATE RETAILER_AUTH SET code = '-32565' , codeVerified = '1' , shopActPhoto = ?  WHERE retailerId = ? ";
            con.query(sql, [url_lp,retailerId], function(err, result) {
              if (err) {
                var myobj = {
                  verificationStatus: true,
                  update: false,
                  responseFrom: "verify_mail"
                }
                console.log("sql update failed");
                res.send(JSON.stringify(myobj));
              } else {
                var sql = "SELECT * FROM `RETAILER_AUTH` where `retailerId`=?";
                con.query(sql, [retailerId], function(err, result) {
                  if (err) {
                    console.log("error in returning retailer table");
                    var myobj = {
                      'verificationStatus': true,
                      'update': true,
                      'output': false,
                      responseFrom: "verify_mail"
                    }
                    console.log(JSON.stringify(myobj));
                    res.send(JSON.stringify(myobj));
                  } else {
                    var url_dp='/public/'+retailerId+'/dp.jpeg';
                    var url_sp= '/public/'+retailerId+'/sp.jpeg';
                    var sql = "INSERT INTO `RETAILER_DATA` (`retailerId`, `enterpriseName`, `mobileNo`, `addLine1`, `addLine2`, `city`, `state`, `country`, `proprietor`, `profilePhoto`, `latLoc`, `longLoc`, `openCloseIsManual`, `shopOpenTime1`, `shopCloseTime1`, `shopOpenTime2`, `shopCloseTime2`, `currentState`, `shopPhoto`, `verifiedByTeam`, `locationVerified`, `mobileVerified`,`lastStatusUpdate`) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, '0', '0', '0',NULL)"
                    con.query(sql, [retailerId,url_dp,url_sp], function(err, result) {
                      if (err) console.log("error in retailer_data entry");
                      else {
                        console.log("retailer data entered");
                      }
                    });
                    var sql = "SELECT * FROM `RETAILER_DATA` where `retailerId`=?";
                    con.query(sql, [retailerId], function(err, data) {
                      if (err) {
                        console.log(err);
                        console.log("retailer_data fetch problem");
                      } else {
                        console.log("retailer_data fetched");
                        var myobj = {
                          'verificationStatus': true,
                          'update': true,
                          responseFrom: "verify_mail",
                          'retailerAuthTable': result[0],
                          'retailerDataTable': data[0]
                        }
                        console.log(result);
                        console.log(JSON.stringify(myobj));
                        res.send(JSON.stringify(myobj));
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  });

}
module.exports = verify_mail;
