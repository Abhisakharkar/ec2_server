var add_retailer_product_id = function(req, res) {


  var retailerId = req.body.retailerId;
  var productId = req.body.productId;
  var price = req.body.price;
  var description = req.body.description;
  var photo = req.body.photo;
  var availability = req.body.availability;
  var star = req.body.star;
  var textField = req.body.textField;
  if(availability==null)availability=0;
  if (star==null) star=0;


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
    var sql = "INSERT INTO `RET_PROD_ID` (`retailerId`, `productId`, `price`, `description`, `photo`, `availability`, `star`, `textField`) VALUES (?,?,?,?,?,?,?,?)";
    con.query(sql, [retailerId, productId, price, description, photo, availability, star, textField], function(err, result) {
      if (err){
      console.log(err);
      var myObj = {
        insertSuccess: false,
        responseFrom: "add_retailer_product_id",
        in: 'four_true'
      }
      res.end(JSON.stringify(myObj));

      }
      else {
      console.log("1 record inserted in RET_PROD_ID table");
      var myObj = {
        insertSuccess: true,
        responseFrom: "add_retailer_product_id",
        in: 'four_true'
      }
      res.end(JSON.stringify(myObj));

      }

    });
  });


}

module.exports = add_retailer_product_id;
