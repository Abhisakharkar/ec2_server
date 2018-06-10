var magentoProductInfo = function(req,res){

"use strict";

var request = require('request');

var product_SKU=req.body.product_SKU;

console.log(product_SKU);

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
    //console.log(body);
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


var groupArray=[];
//basic usage
mageClient.init()
mageClient.get('/V1/products', {searchCriteria: { "filter_groups":[ { "filters" : [ { "field": "SKU", "value": product_SKU } ] } ],currentPage:'2'} }) //Get a list of all products

  .then(products => {
    //do something with the returned product data
    
  

  //console.log(groupArray.length);
    
  console.log(products);
  res.end(JSON.stringify(products));


})
  }

  
});


}
module.exports=magentoProductInfo;
