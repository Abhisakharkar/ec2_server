var sign_up = function (req,res) {
  var mysql = require('mysql');

  var mail,password,subsciptionDateTime,codeVerified,mandatoryDate,membership,retailerId,shopActPhoto,shopActLicenseNo;
  mail=req.body.mail;
  password=req.body.password;
  subscriptionDateTime=req.body.subscriptionDateTime;
  codeVerified=0;
  mandatoryData=0;
  membership=1;

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;  //random code generator
  }
  var code=getRandomInt(10000,99999);

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({                  // node mailer
  	service: 'gmail',
  	auth: {
    		user: 'wolfsburgproject@gmail.com',
    		pass: 'Wolfsburg@1234'
  		}
	});
  var mailOptions = {
  		from: 'wolfsburgproject@gmail.com',
  		to: mail,
  		subject: 'Email authentication for hover!',
  		text: 'Authentication code is : '+ code +'.'
	};
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
            var sql = "INSERT INTO `RETAILER_AUTH` (`retailerId`, `mail`, `password`, `membership`, `subscriptionDateTime`, `shopActPhoto`, `shopActLicenseNo`, `code`, `codeVerified`, `mandatoryData`) VALUES (?,?,?,?,?,?,?,?,?,?)";
            con.query(sql,[retailerId,mail,password,membership,subscriptionDateTime,shopActPhoto,shopActLicenseNo,code,codeVerified,mandatoryData],function (err,result) {
                    if (err) {
                      console.log(err);
                      console.log("error in sign_up query insertion");
                      var myobj={
                      signUpSuccessStatus: false,
                      mailSent:false,
                      responseFrom:"sign_up"
                      }
                      console.log(JSON.stringify(myobj));
                      res.end(JSON.stringify(myobj));
                    }
                    else {
                      console.log("sign_up successful");
                      transporter.sendMail(mailOptions, function(error, info){
          		            if (error) {
            		            console.log(error);
                            var myobj={
                                signUpSuccessStatus: true,
                                mailSent:false,
                                responseFrom:"sign_up"
                            }
                            console.log(JSON.stringify(myobj));
                            res.end(JSON.stringify(myobj));
	                        }
                          else {
            		              console.log('Email sent: ' + info.response);
                              var myobj={
                                signUpSuccessStatus: true,
                                mailSent:true,
                                responseFrom:"sign_up"
                              }
                              console.log(JSON.stringify(myobj));
                              res.end(JSON.stringify(myobj));
          		            }
        	             });
                     }
           });
    }
  });
}
module.exports=sign_up;
