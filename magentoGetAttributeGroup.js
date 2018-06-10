var magentoGetAttributeGroup = function(req,res){

"use strict";

var request = require('request');

var set_id=req.body.set_id;

console.log(set_id);

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
mageClient.get('/V1/products/attribute-sets/groups/list', {
    "search_criteria": {
      "filter_groups": [{
        "filters": [{
          "field": "attribute_set_id",
          "value": set_id
        }]
      }]
    }
  }) //Get a list of all products
  .then(products => {
    //do something with the returned product data
    
  
  console.log(products.items.length+"\n");
  
  for(var i=0;i<products.items.length;i++){
      var group_id = products.items[i].attribute_group_id;
      console.log(group_id);

      var name=products.items[i].attribute_group_name;
      console.log(name);
      mageClient.init()
      mageClient.get('/V1/categories/attributes', {searchCriteria:  {
      "filter_groups": [{
            "filters": [{
            "field": "attribute_group_id",
            "value": group_id
            }]
          }]
      }}) //Get a list of all products
      .then(products1 => {
        //do something with the returned product data
      //console.log(products);
      //res.end(JSON.stringify(products));

        //console.log(products1);
        groupArray.push({  "name" : name , "attributes " : products1 });

        console.log(groupArray+"\n"); 
        console.log();

        if(groupArray.length==products.items.length){

          var myObj={
              "items" : groupArray 
          };
            res.end(JSON.stringify(myObj));
        }       

    })

  }


  //console.log(groupArray.length);
    
  //console.log(myObj);
 // res.end(JSON.stringify(myObj));


})
  }

  
});


}
module.exports=magentoGetAttributeGroup;
