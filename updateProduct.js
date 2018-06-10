var product_details_update = function(req,res){


var retailerID=req.body.retailerID;
var productID=req.body.productID;
var price=req.body.price;
var desc=req.body.desc;
var photo=req.body.photo;
var avail=req.body.avail;
var star=req.body.star;
var comment=req.body.comment;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MH31eh@2964",
  database: "UpDataBase"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "UPDATE `Product` SET  `Price` = ? , `Description` = ? , `Photo` = ? , `Availability` = ? , `Star` = ? , `TextField` = ? WHERE `RetailerID`= ? and  `ProductID`= ? ";
  con.query(sql,[price,desc,photo,avail,star,comment,retailerID,productID], function (err, result) {
    if (err) throw err;
    console.log("1 record updated");

    var myObj={
      result : true ,
      in : 'four_true'

    }
    res.end(JSON.stringify(myObj));


  });
});


}

module.exports=product_details_update;

