var magento_get_categories = function (req,res) {
      "use strict";

      const Magento2 = require('node-magento2');

      //instantiate the client object
      const options = {
        authentication: {
          integration: { //from the integrations section in the magento2 backend
            consumer_key: '9v92qagldi60lxcjn7c07chqesc2ebfu',
            consumer_secret: '9nodsmg9fyt5af1f0uutkah4vol7a06a',
            access_token: '8teumvy8mdp6epueimc382f4orfwfvmp',
            access_token_secret: 'h6hfywb5k92lyyqjsahohn4bs6wyfbac'
          }
        }
      }
      const mageClient = new Magento2('http://localhost/magento', options)
      mageClient.init()
      mageClient.get('/V1/categories/list?fields=items[id,parent_id,name,position,level,children,path,include_in_menu]', {searchCriteria: {currentPage:'1'}}) //Get a list of all products
      .then(products => {
    //do something with the returned product data

    res.contentType('application/json');
    var myObj={
      "responseFrom":"magento_get_categories",
      "categories":products
    }
    res.send(JSON.stringify(myObj));

  });

}
module.exports=magento_get_categories;
