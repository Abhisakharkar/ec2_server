var is_Data_Filled = function(req,res){

var mail=req.body.mail;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MH31eh@2964",
  database: "UpDataBase"
});

var myObj1,myObj2;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
/*  var sql = "SELECT `ContactNo` FROM `Temp_Retailer` WHERE `Mail` = ? and `ContactNo` = 0 ";
  con.query(sql,[mail], function (err, rows , result) {
    
    console.log("temp: " + rows.length);
    if (err) throw err;
    
    else if(!rows.length){


        myObj1={
          isDataFilled : true , 
          response_from : "is_data_filled"
        }

  */  
        var sql = "SELECT `ContactNo` FROM `Retailer` WHERE `Mail` = ? and `ContactNo` = 0 ";
        con.query(sql,[mail], function (err,rows, result) {
        
          console.log("perm: " + rows.length);

        if (err) throw err;
        else if(!rows.length){
            myObj2={
                isDataFilled : true , 
                response_from : "is_data_filled"
            }

        }
    
        else{

        myObj2={
              isDataFilled : false ,
              response_from : "is_data_filled"
          }
  
        }


        res.end(JSON.stringify(myObj2));
        
        });
    


  



    });
/*
    else{
        myObj1={
          isDataFilled : false ,
          response_from : "is_data_filled"
        } 
        res.end(JSON.stringify(myObj1));
    }


  });
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT `ContactNo` FROM `Temp_Retailer` WHERE `Mail` = ? ";
  con.query(sql,[mail], function (err, result) {
    if (err) throw err;
    
    console.log(result);

    myObj2={
      "items" : result
    }
  
      console.log(myObj);

    


  });
});


*/

}

module.exports=is_Data_Filled;
