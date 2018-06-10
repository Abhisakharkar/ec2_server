var magentoAttributesGet = function(req,res){

"use strict";

var request = require('request');

var group_id = req.body.group_id;

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
mageClient.get('/V1/categories/attributes', {searchCriteria:  {
 "filter_groups": [{
        "filters": [{
          "field": "attribute_group_id",
          "value": group_id
        }]
      }]
  }}) //Get a list of all products
.then(products => {
    //do something with the returned product data
    console.log(products);
    res.end(JSON.stringify(products));
  })
  }
});





}
module.exports=magentoAttributesGet;
