var display_products_associated_with_retailer_id = function(req, res) {


  var retailerId = req.body.retailerId;

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
      console.log("database connection failed");
    } else {
      console.log("Connected!");
      var sql = "SELECT * FROM `RET_PROD_ID` WHERE `retailerId` = ? ";
      con.query(sql, [retailerId], function(err, rows) {
        if (err) {
          console.log("error in query execution");
        } else {
          console.log("retailerId" + retailerId);
          var myObj = {
            "retailerId": retailerId,
            "items": rows
          }
          console.log(myObj);
          res.end(JSON.stringify(myObj));
        }
      });
    }
  });


}

module.exports = display_products_associated_with_retailer_id;
