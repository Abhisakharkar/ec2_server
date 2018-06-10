var check_in_temp = function(req,res){
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

        var someVar = [];


        con.query("select * from `Temp_Retailer` where `Mail`= ? ", [mail] , function(err, rows){
          if(err) {
              throw err;
          }
           else if(!rows.length){
              console.log("0 length one ");
              console.log(mail+" "+pass);
              var myObj={
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
                  temp_result : false ,
                  response_from : "check_in"
                }
             
             res.end(JSON.stringify(myObj));
             console.log(myObj);
             
          }
          else {
            //setValue(rows);

            console.log("dhbkhsd");
            console.log(rows[0]);
            myObj = rows[0];
            myObj['temp_result'] = true ;
            myObj['response_from'] = "check_in";
            res.end(JSON.stringify(myObj));
            console.log(myObj);
            

          }
        });

          }
      });

      /*  function setValue(value) {
          	console.log("Found in Temp_permanent!");


            var retailerId,password,enterpriseName,propritor,contactNo,mail,profilePhoto,latLocation,longLocation,address,city,state,country,membership,subDate,openCloseIsManual,shopOpenTime,shopCloseTime,shopOpenTime2,shopCloseTime2,shopPhoto,shopActLicense,currentState;



            var queryString="select * from `Temp_Retailer`";
            con.query(queryString,function(err, rows, fields){
              if(err) {
                throw err;
              }
              res.end(JSON.stringify(rows[0].post_title));
            /*  retailerId= rows[0].post_title;
              password=rows[1].post_title;
              enterpriseName=rows[2].post_title;
              propritor=rows[3].post_title;
              contactNo=rows[4].post_title;
              mail=rows[5].post_title;
              profilePhoto=rows[6].post_title;
              latLocation=rows[7].post_title;
              longLocation=rows[8].post_title;
              address=rows[9].post_title;
              city=rows[10].post_title;
              state=rows[11].post_title;
              country=rows[12].post_title;
              membership=rows[13].post_title;
              subDate=rows[14].post_title;
              openCloseIsManual=rows[15].post_title;
              shopOpenTime=rows[16].post_title;
              shopCloseTime=rows[17].post_title;
              shopOpenTime2=rows[18].post_title;
              shopCloseTime2=rows[19].post_title;
              shopPhoto=rows[20].post_title;
              shopActLicense=rows[21].post_title;
              currentState=rows[22].post_title;

            });

            var myObj={
              result : true,
              in : 'three_true',
              country1 : country ,
              my : 1
            }
            res.end(JSON.stringify(myObj));
          }*/
}
module.exports=check_in_temp;
