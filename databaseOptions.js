var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MH31eh@2964",
  database: "hoverBackend"
});



module.exports=con;
