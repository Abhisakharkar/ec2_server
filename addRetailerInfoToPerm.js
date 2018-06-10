var details_input_perm = function(req,res){

    var retailerId,password,enterpriseName,propritor,contactNo,mail,profilePhoto,latLocation,longLocation,address,city,state,country,membership,subDate,openCloseIsManual,
    shopOpenTime,shopCloseTime,shopOpenTime2,shopCloseTime2,shopPhoto,shopActLicense,currentState;

    retailerId= req.body.retailerId;
    password=req.body.password;
    enterpriseName=req.body.enterpriseName;
    propritor=req.body.propritor;
    contactNo=req.body.contactNo;
    mail=req.body.mail;
    profilePhoto=req.body.profilePhoto;
    latLocation=req.body.latLocation;
    longLocation=req.body.longLocation;
    address=req.body.address;
    city=req.body.city;
    state=req.body.state;
    country=req.body.country;
    membership=req.body.membership;
    subDate=req.body.subDate;
    openCloseIsManual=req.body.openCloseIsManual;
    shopOpenTime=req.body.shopOpenTime;
    shopCloseTime=req.body.shopCloseTime;
    shopOpenTime2=req.body.shopOpenTime2;
    shopCloseTime2=req.body.shopCloseTime2;
    shopPhoto=req.body.shopPhoto;
    shopActLicense=req.body.shopActLicense;
    currentState=req.body.currentState;




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
      var sql = "INSERT INTO `Retailer`(`RetailerID`, `Password`, `EnterpriseName`, `Propritor`, `ContactNo`, `Mail`, `ProfilePhoto`, `LatitudeLocation`, `LongitudeLocation`, `Address`, `City`, `State`, `Country`, `Membership`, `SubscriptionDate`, `OpenCloseIsManual`, `ShopOpenTime`, `ShopCloseTime`, `ShopOpenTime2`, `ShopCloseTime2`, `ShopPhoto`, `ShopActLicense`, `CurrentState`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      con.query(sql,[retailerId,password,enterpriseName,propritor,contactNo,mail,profilePhoto,latLocation,longLocation,address,city,state,country,membership,subDate,openCloseIsManual,shopOpenTime,shopCloseTime,shopOpenTime2,shopCloseTime2,shopPhoto,shopActLicense,currentState], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");


        var myObj={
          result : true,
          in : 'one_true'
        }
        res.end(JSON.stringify(myObj));

      });
    });
}
module.exports = details_input_perm;
