var check_mail_exist = function (req,res) {

  var mysql = require('mysql');

  var mail;
  mail=req.body.mail;
  console.log(mail);

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
      console.log("Connected to database!");
      var sql = "SELECT * FROM `RETAILER_AUTH` where `Mail`= ?";
      con.query(sql,[mail], function (err, rows) {
        if(err)
        {console.log(err);
          console.log("error in retailer select in checkMailExist");
        }
        else {
          if(!rows.length){
            console.log("mail does not exist");
              var myobj={
              mailExist:false,
              responseFrom:"checkMailExist"
            }
          }
          else{
            console.log("mail exist");
              var myobj={
              mailExist:true,
              responseFrom:"checkMailExist"
            }
          }
          console.log(JSON.stringify(myobj));
          res.end(JSON.stringify(myobj));
        }
      });
    }
  });
}
module.exports=check_mail_exist;
