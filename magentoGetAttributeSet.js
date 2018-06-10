var magentoAttributeSetGet = function(req,res){

"use strict";

var request = require('request');

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

//basic usage
mageClient.init()
mageClient.get('/V1/eav/attribute-sets/list', {searchCriteria: { currentPage:'1'} } ) //Get a list of all products
.then(products => {
    //do something with the returned product data
    //console.log(products);
    res.end(JSON.stringify(products));
  })
  }
});




//"filter_groups":[ { "filters" : [ { "field": "attribute_set_id", "value": 2 } ] } ],
}
module.exports=magentoAttributeSetGet;
