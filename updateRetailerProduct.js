var update_retailer_product = function(req, res) {


  var retailerId = req.body.retailerId;
  var productId = req.body.productId;
  var price = req.body.price;
  var description = req.body.description;
  var photo = req.body.photo;
  var availability = req.body.availability;
  var star = req.body.star;
  var textField = req.body.textField;


  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MH31eh@2964",
    database: "hoverBackend"
  });



  con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected!");
    var sql = "UPDATE `RET_PROD_ID` SET `price` = ?, `description` = ?, `photo` = ?, `availability` = ?, `star` = ?, `textField` = ? WHERE `RET_PROD_ID`.`retailerId` = ? AND `RET_PROD_ID`.`productId` = ? ";
    con.query(sql, [price, description, photo, availability, star, textField,retailerId, productId], function(err, result) {
      if (err){
      console.log(err);
      var myObj = {
        insertSuccess: false,
        responseFrom: "update_retailer_product",
        in: 'four_true'
      }
      res.end(JSON.stringify(myObj));

      }
      else {
      console.log("1 record inserted in RET_PROD_ID table");
      var myObj = {
        insertSuccess: true,
        responseFrom: "update_retailer_product",
        in: 'four_true'
      }
      res.end(JSON.stringify(myObj));

      }

    });
  });


}

module.exports = update_retailer_product;
