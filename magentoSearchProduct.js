var magento_search_product = function(req, res) {

    var searchTerm = req.body.searchTerm;

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
    mageClient.get('/V1/search?fields=items[id]', {
        "search_criteria": {
          //  "currentPage":'1',
          "requestName": "quick_search_container",
          "filter_groups": [{
            "filters": [{
              "field": "search_term",
              "value": searchTerm,
              "condition_type": "like"
            }]
          }]
        }
    }) //Get a list of all products
    .then(products => {
        var p_id = "";
        for (var i = 0; i < products.items.length; i++) {
          p_id += products.items[i].id;
          if (i < (products.items.length - 1)) {
            p_id += ",";
          }
        }
        mageClient.get('V1/products?fields=items[sku,id,name,price,attribute_set_id,custom_attributes]', {
            "search_criteria": {
              "currentPage": '1',
              "filter_groups": [{
                "filters": [{
                  "field": "entity_id",
                  "value": p_id,
                  "condition_type": "in"
                }]
              }]
            }
          }) //Get a list of all products
          .then(products1 => {
            var myObj={
              "responseFrom":"magento_search_product",
              "products":products1.items
            }
          res.end(JSON.stringify(myObj));
          })
    })
}
module.exports = magento_search_product;
