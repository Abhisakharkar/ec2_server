var magentoCategoryGet = function(req,res){

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
mageClient.get('/V1/categories/list', {searchCriteria: {currentPage:'1'}}) //Get a list of all products
.then(products => {
    //do something with the returned product data
    

//     var res={};
     var itemsArray=[]
    for(var i=0;i<products.items.length;i++){
      

      itemsArray.push({"id":products.items[i].id , "name":products.items[i].name });
      

    }

    var myObj={
    	"items":itemsArray
    } 


    res.contentType('application/json');
    res.send(JSON.stringify(products));






    console.log(myObj);
	//res.end(JSON.stringify(products));
  })

  }
});





}
module.exports=magentoCategoryGet;
