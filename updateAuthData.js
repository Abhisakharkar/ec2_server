var update_auth_data = function(req, res) {
  var mysql = require('mysql');
  var mail = req.body.mail;
  var password = req.body.password;
  var shopActLicenseNo = req.body.shopActLicenseNo;
  var mandatoryData = req.body.mandatoryData;

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
            responseFrom: "update_auth_data",
            userFound: false
          }
          res.end(JSON.stringify(myobj));

        } else {
          var retailerId = rows[0].retailerId;
          var sql = "UPDATE `RETAILER_AUTH` SET `shopActLicenseNo` = ?, `mandatoryData` = ? WHERE `RETAILER_AUTH`.`retailerId` = ? ";
          con.query(sql, [shopActLicenseNo, mandatoryData, retailerId], function(err, rows) {
            if (err) {
              console.log(err);
              var myobj = {
                responseFrom: "update_auth_data",
                userFound: true,
                update: false
              }
              res.end(JSON.stringify(myobj));
              console.log("error in sql query in update auth data");
            } else {
              var myobj = {
                responseFrom: "update_auth_data",
                userFound: true,
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
module.exports = update_auth_data;
