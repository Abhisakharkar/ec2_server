var magentoAddProduct = function(req,res){

"use strict";
var retailer_id = req.body.retailer_id;
var id = req.body.id ;
var sku =  req.body.sku ;
var name = req.body.name ;
var attribute_set_id= req.body.attribute_set_id ;
var price=req.body.price ;
var status=req.body.status ;
var type_id=req.body.type_id ;
var weight=req.body.weight ;

var request = require('request');


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
  con.query("insert into `Product`(`RetailerId`,`ProductId`,`Price`) VALUES (?,?,?) ", [retailer_id,id,price] , function(err, result){
          if(err) {
            console.log("error in sql");
            throw err;
          }
          else{
              
              console.log("Added to product");         
          }


            });
    
      });


var options1 = {
  uri: 'http://localhost/magento/rest/V1/integration/admin/token',
  method: 'POST',
  json: {
    username : "admin",
    password : "Abhishek_007"
  }
};

request(options1, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
    var tok=body;


const Magento2 = require('node-magento2');

//instantiate the client object
const options = {
  authentication: {
    integration: {
      access_token: tok
    }
  }
}



const mageClient = new Magento2('http://localhost/magento', options)

//basic usage
mageClient.init()
mageClient.post('/V1/products', {
   "product": {
      "id": id,
      "sku": sku,
      "name": name,
      "attribute_set_id": attribute_set_id,
      
      "price": price,
      "status": status,
      "type_id": type_id,
      "weight": weight
        }}) //Create a new product
  .then(product => {
    //the created product object
	console.log(product);
	var myObj={
      result : true ,
      in : 'addProductMagento'

    }
    res.end(JSON.stringify(myObj));

  })


  }
});





}
module.exports=magentoAddProduct;
