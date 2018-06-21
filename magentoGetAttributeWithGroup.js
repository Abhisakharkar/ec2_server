var magento_get_attribute_with_group = function (req,res) {

      "use strict";

      var request = require('request');

      var attributeSetId = req.body.attributeSetId;

      "use strict";

      const Magento2 = require('node-magento2');

      //instantiate the client object
      const options = {
        authentication: {
          integration: { //from the integrations section in the magento2 backend
            consumer_key: '1fd9w40537fff45fn3he7p6cwaunxlfa',
            consumer_secret: '1xfxjeph6bwdulows6myruh50p9pnhbx',
            access_token: '6jcpnxt8b12fdiqu4ssnpgc6oudqclug',
            access_token_secret: 'mgodjg32ix9phhar6iimlcq81p0rq9l5'
          }
        }
      }
      const mageClient = new Magento2('http://localhost/magento', options)
      var groupArray=[];
      mageClient.init()
      mageClient.get('/V1/products/attribute-sets/groups/list', {
          "search_criteria": {
            "filter_groups": [{
              "filters": [{
                "field": "attribute_set_id",
                "value": attributeSetId
              }]
            }]
          }
        }) //Get a list of all products
        .then(products => {
                //do something with the returned product data
          console.log(products.items.length + "\n");
          for (var i = 0; i < products.items.length; i++) {
            var group_id = products.items[i].attribute_group_id;
            console.log(group_id);
            var name = products.items[i].attribute_group_name;
            console.log(name);
            mageClient.init()
            mageClient.get('/V1/categories/attributes', {
                searchCriteria: {
                  "filter_groups": [{
                    "filters": [{
                      "field": "attribute_group_id",
                      "value": group_id
                    }]
                  }]
                }
              }) //Get a list of all products
              .then(products1 => {
                  groupArray.push({
                  "name": name,
                  "attributes ": products1
                  });
                  console.log(groupArray + "\n");
                  console.log();
                  if (groupArray.length == products.items.length) {
                    var myObj = {
                      "items": groupArray
                    };
                    res.end(JSON.stringify(myObj));
                  }

              });// attributes

          }
        });


}// upper end
module.exports=magento_get_attribute_with_group;
