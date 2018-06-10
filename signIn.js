var sign_in= function (req,res) {
  var mysql = require('mysql');
  var mail,password;
  mail=req.body.mail;
  password=req.body.password;

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
                  var sql ="SELECT * FROM RETAILER_AUTH WHERE mail = ? AND password =?";
                  con.query(sql,[mail,password],function (err,rows) {
                          if(err){
                          console.log(err);
                          console.log("error in sql query in sign in");
                          var myobj={
                          signIn:false,
                          responseFrom:"sign_in"
                          }
                          console.log(JSON.stringify(myobj));
                          res.send(JSON.stringify(myobj));
                          }
                          else {
                                    if (!rows.length) {
                                        console.log("password wrong");
                                        var myobj={
                                          signIn: false,
                                          responseFrom:"sign_in"
                                        }
                                        console.log(JSON.stringify(myobj));
                                        res.end(JSON.stringify(myobj));
                                    }
                                    else {

                                        var myobj={
                                          signIn: true,
                                          responseFrom:"sign_in",     // also  kept same for update device id
                                          retailerAuthTable:rows[0]
                                        }
                                        console.log(JSON.stringify(myobj));
                                        res.end(JSON.stringify(myobj));
                                      }
                          }
                        });
              }

    });
}
module.exports=sign_in;
