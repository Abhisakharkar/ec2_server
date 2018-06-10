var display_retailer_details = function(req,res){


var retailerID=req.body.retailerID;

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
  var sql = "SELECT * FROM `Retailer` WHERE `RetailerID` = ? ";
  con.query(sql,[retailerID], function (err, result) {
    if (err) throw err;
    console.log("hdbvkhsv  "+retailerID);

    var myObj={
      "items" : result
    }
  
      console.log(myObj);

    res.end(JSON.stringify(myObj));


  });
});


}

module.exports=display_retailer_details;
