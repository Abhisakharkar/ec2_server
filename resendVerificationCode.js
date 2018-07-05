var resend_verification_code = function(req, res, authData) {
  var mysql = require('mysql');
  var mail, retailerId;
  mail = authData.data.mail;
  retailerId = authData.data.retailerId;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //random code generator
  }
  var code = getRandomInt(10000, 99999);

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({ // node mailer
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
    text: 'Authentication code is : ' + code + '.'
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
    } else {
      console.log("Connected to database!");
      var sql = "UPDATE RETAILER_AUTH SET Code = ? WHERE retailerId = ?";
      con.query(sql, [code, retailerId], function(err, result) {
        if (err) {
          console.log(err);
          var myobj = {
            codeUpdate: false,
            update: false,
            responseFrom: "resend_verification_code"
          }
          console.log(JSON.stringify(myobj));
          res.send(JSON.stringify(myobj));
        } else {
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
              var myobj = {
                codeUpdate: true,
                mailSent: false,
                responseFrom: "resend_verification_code"
              }
              console.log(JSON.stringify(myobj));
              res.end(JSON.stringify(myobj));
            } else {
              console.log('Email sent: ' + info.response);
              var myobj = {
                codeUpdate: true,
                mailSent: true,
                responseFrom: "resend_verification_code"
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
module.exports = resend_verification_code;
