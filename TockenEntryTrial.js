"use strict";

const Magento2 = require('node-magento2');

//instantiate the client object
const options = {
  authentication: {
    integration: {
      access_token: 'uernqos4sqkkfpqjgcd1cq56jdwlspg4'
    }
  }
}



const mageClient = new Magento2('http://localhost', options)

//basic usage
mageClient.init()
mageClient.get('/V1/products', {searchCriteria: {currentPage:'1'}}) //Get a list of all products
.then(products => {
    //do something with the returned product data
    console.log(products);
  })
