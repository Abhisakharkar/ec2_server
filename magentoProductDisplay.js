var magentoDisplayProduct = function(req,res){

"use strict";




var request = require('request');

var id_category=req.body.id_category;


console.log(id_category);

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
mageClient.get('/V1/products', {searchCriteria: { "filter_groups":[ { "filters" : [ { "field": "category_id", "value": id_category } ] } ],currentPage:'2'} }) //Get a list of all products
.then(products => {
    //do something with the returned product data
    var itemsArray=[];

    for(var i=0;i<products.items.length;i++){

      itemsArray.push({"id":products.items[i].id , "name":products.items[i].name  ,"price": products.items[i].price , "attribute-set-id": products.items[i].attribute_set_id , "image-url" : products.items[i].custom_attributes[3].value });
      

    }
    

    var myObj={
      "items" : itemsArray 
    };




    res.contentType('application/json');
    res.send(JSON.stringify(myObj));

  

    console.log(myObj);

    //console.log("\n\n\n\n");

   // console.log(products);
//console.log(products);
  //  res.send(JSON.stringify(products));
   
    


	//res.end(JSON.stringify(products));
  })

  

  }
});





}
module.exports=magentoDisplayProduct;
