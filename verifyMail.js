var verify_mail = function (req,res) {
    var mail,password,code,retailerId;

    mail=req.body.mail;
    password=req.body.password;
    code=req.body.code;

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
      }
      else {
            console.log("database connected!!");
            var sql='SELECT * FROM `RETAILER_AUTH` WHERE `Mail` = ? AND `Password` = ?  AND `Code`=?';
            con.query(sql,[mail,password,code],function (err,rows) {
                  if (err){
                    console.log(err);
                    console.log("query failed");
                  }
                  else {
                        if (!rows.length) {
                        var myobj={
                        verificationStatus:false
                        }
                        console.log("rows length is 0");
                        res.send(JSON.stringify(myobj));
                        }
                        else {
                            retailerId=rows[0].RetailerId;
                            var sql ="UPDATE RETAILER_AUTH SET Code = '-32565' , CodeVerified = '1'  WHERE RetailerId = ? ";
                            con.query(sql,[retailerId],function (err,result) {
                                if(err){
                                    var myobj={
                                    verificationStatus:true,
                                    update:false
                                    }
                                    console.log("sql update failed");
                                    res.send(JSON.stringify(myobj));
                                }
                                else {
                                    var sql ="SELECT * FROM `RETAILER_AUTH` where `RetailerId`=?";
                                    con.query(sql,[retailerId],function (err,result) {
                                        if(err){
                                          console.log("error in returning retailer table");
                                          var myobj={
                                          'verificationStatus':true,
                                          'update':true,
                                          'output':false
                                          }
                                          console.log(JSON.stringify(myobj));
                                          res.send(JSON.stringify(myobj));}
                                        else {
                                          var sql="INSERT INTO `RETAILER_DATA` (`RetailerId`, `EnterpriseName`, `MobileNo`, `AddLine1`, `AddLine2`, `City`, `State`, `Country`, `Proprietor`, `ProfilePhoto`, `LatLoc`, `LongLoc`, `OpenCloseIsManual`, `ShopOpenTime1`, `ShopCloseTime1`, `ShopOpenTime2`, `ShopCloseTime2`, `CurrentState`, `ShopPhoto`, `VerifiedByTeam`, `LocationVerified`, `MobileVerified`) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', '0', '0')"
                                          con.query(sql,[retailerId],function (err,result) {
                                            if(err)console.log("error in retailer_data entry");
                                            else {
                                              console.log("retailer data entered");
                                            }
                                          });
                                          var myobj={
                                          'verificationStatus':true,
                                          'update':true,
                                          'retailerAuthTable':result[0]
                                          }
                                          console.log(JSON.stringify(myobj));
                                          res.send(JSON.stringify(myobj));
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
module.exports=verify_mail;
