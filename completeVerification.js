var verification_complete = function(req,res){

    var code = req.body.code;

    var mail,pass;

    mail=req.body.mail;
    pass=req.body.password;

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

  var sql = "SELECT `Code` FROM `Temp_Retailer` WHERE `Mail`= ? and `Password`= ? ";
con.query(sql,[mail, pass],function( err , result ){

  
  var t=JSON.stringify(result);
  
  var c=t.substring(9,t.length-2);
  console.log(t.substring(9,t.length-2));

  if(err){
      throw err;
  }
  else if(c != code){

      var obj={
        result : false
      }

      console.log(obj);
      JSON.stringify(obj);
  }

else{
con.query("INSERT INTO `Retailer` ( `RetailerID`,`Password`,`EnterpriseName`,`Propritor`,`ContactNo`,`Mail`,`ProfilePhoto`,`LatitudeLocation`,`LongitudeLocation`,`Address`,`City`,`State`,`Country`,`Membership`,`SubscriptionDate`,`OpenCloseIsManual`,`ShopOpenTime`,`ShopCloseTime`,`ShopOpenTime2`,`ShopCloseTime2`,`ShopPhoto`,`ShopActLicense`,`CurrentState`)  SELECT `RetailerID`,`Password`,`EnterpriseName`,`Propritor`,`ContactNo`,`Mail`,`ProfilePhoto`,`LatitudeLocation`,`LongitudeLocation`,`Address`,`City`,`State`,`Country`,`Membership`,`SubscriptionDate`,`OpenCloseIsManual`,`ShopOpenTime`,`ShopCloseTime`,`ShopOpenTime2`,`ShopCloseTime2`,`ShopPhoto`,`ShopActLicense`,`CurrentState` FROM `Temp_Retailer`  WHERE `Mail` = ? and `Password` = ? ", [mail,pass] , function(err, rows){
  if(err) {
    throw err;
  }
  else {
  	myObj={
  		result: true
  	}
  	res.end(JSON.stringify(myObj));

}
});
}

});
});



}
module.exports = verification_complete;








