var verify_email = function(req, res){

    console.log(req.body.mail);
    var mail_id= req.body.mail ;

    var validator = require('validator');

    var isValid = validator.isEmail(mail_id); //=> true

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



var code=getRandomInt(10000,99999);
if(isValid){


	var mysql = require('mysql');

	var con = mysql.createConnection({
  		host: "localhost",
  		user: "root",
  		password: "MH31eh@2964",
  		database: "UpDataBase"
	});

	con.connect(function(err) {
  		if (err) throw err;
  		var sql = "UPDATE `Temp_Retailer` SET `Code` = ? WHERE `Mail` = ? ";
  		con.query(sql,[code,mail_id], function (err, result) {
   			if (err) throw err;
    		console.log(result.affectedRows + " record(s) updated");
  		});
	});





	var nodemailer = require('nodemailer');


	var transporter = nodemailer.createTransport({
  	service: 'gmail',
  	auth: {
    		user: 'wolfsburgproject@gmail.com',
    		pass: 'Wolfsburg@1234'
  		}
	});

	var mailOptions = {
  		from: 'wolfsburgproject@gmail.com',
  		to: mail_id ,
  		subject: 'Email authentication from Aniket!',
  		text: 'Authentication code is : '+ code +'.'
	};

	transporter.sendMail(mailOptions, function(error, info){
  		if (error) {
    		console.log(error);
  		} else {
    		console.log('Email sent: ' + info.response);
  		}
	});
  myObj={
    result : true
  }
  res.end(JSON.stringify(myObj));
}
else{
  myObj={
    result: false
  }
  res.end(JSON.stringify(myObj));
}

}

module.exports=verify_email;
