var check_in_perm = function(req,res){

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

con.query("select * from `Retailer` where `Mail`= ? ", [mail] , function(err, rows){
  if(err) {
    throw err;
  }
  else if(!rows.length){
    console.log("0 length");
    console.log(mail+" "+pass);


    // if check in permanet result is false

    
        con.query("select * from `Temp_Retailer` where `Mail`= ? ", [mail] , function(err, rows){
          if(err) {
              throw err;
          }
           else if(!rows.length){
              console.log("0 length one ");
              console.log(mail+" "+pass);
              var myObj={
		  result : false ,
                  temp_result : false ,
                  response_from : "check_in"
                }
             
             
             console.log(myObj);
             
             res.end(JSON.stringify(myObj));

           }

          else{


            con.query("select * from `Temp_Retailer` where `Mail`= ? and `Password`= ? ", [mail,pass] , function(err, rows, fields){
              if(err) {
                throw err;
              }
              else if(!rows.length){
                console.log("0 length two ");
                  console.log(mail+" "+pass);
                var myObj={
		  result : false ,
                  temp_result : false ,
                  response_from : "check_in"
                }
             console.log(myObj);
             res.end(JSON.stringify(myObj));
             
             
          }
          else {
            //setValue(rows);

            console.log("dhbkhsd");
            console.log(rows[0]);
            myObj = rows[0];
	    myObj['result'] = false ;
            myObj['temp_result'] = true ;
            myObj['response_from'] = "check_in";
            console.log(myObj);
            res.end(JSON.stringify(myObj));
            
            

          }
        });

          }
      });
   /* if(output.temp_result == false){

        var myObj={
            result: false,
            temp_result: false,
            final_output: "No account exists"
        }
        res.end(JSON.stringify(myObj));
    }
    else{
        res.end(JSON.stringify(output));
    }*/
  }
  else {


    // if check in perm result is true
      con.query("select * from `Retailer` where `Mail`= ? and `Password`= ? ", [mail,pass] , function(err, rows){
        if(err) {
            throw err;
        }
        else if(!rows.length){
          var myObj={
            result: true,
            isPasswordCorrect : false,
            response_from : "check_in",
            final_output : "password incorrect"
          }
          res.end(JSON.stringify(myObj));
        }
        else{
          var myObj={
            result : true,
            isPasswordCorrect : true,
            response_from : "check_in",
            final_output : "direct to home page" ,
		data : rows 
          }
          res.end(JSON.stringify(myObj));
        }


    //setValue(rows);
  
});
}
function setValue(value) {
    console.log("Found in permanent!");
    console.log(mail+" "+pass);
    var myObj={
      e_mail : mail,
      password : pass,
      result : true ,
      in : 'two_true',
      response_from : "check_in"
    }
    res.end(JSON.stringify(myObj));
}


});
}
module.exports = check_in_perm;
