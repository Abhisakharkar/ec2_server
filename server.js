var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

var mkdirp = require('mkdirp');

//const express = require('express')
//const app = express()
var multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.originalname);
    mkdirp('imgs/' + file.originalname.split('.')[1], function(err) {

    });
    cb(null, 'imgs/' + file.originalname.split('.')[1])
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split('.')[0] + '.' + file.mimetype.split('/')[1])
  }
});
var upload = multer({
  storage: storage
})
/*app.get("/",function (req,res) {
  res.send("pong");

})
 */

app.post('/check_mail_exist', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  check_mail_exist = require('./checkMailExist');
  check_mail_exist(req, res);
});

app.post('/sign_up', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  sign_up = require('./signUp');
  sign_up(req, res);
});

app.post('/verify_mail', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  verify_mail = require('./verifyMail');
  verify_mail(req, res);
});

app.post('/resend_verification_code', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  resend_verification_code = require('./resendVerificationCode');
  resend_verification_code(req, res);
});

app.post('/sign_in', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  sign_in = require('./signIn');
  sign_in(req, res);
});

app.post('/add_retailer_product_id', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  add_retailer_product_id = require('./addRetailerProductId');
  add_retailer_product_id(req, res);


});

app.post('/display_products_associated_with_retailer_id', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  display_products_associated_with_retailer_id = require('./displayProductsAssociatedWithRetailerId');
  display_products_associated_with_retailer_id(req, res);
});

app.post('/update_device_id', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  update_device_id = require('./updateDeviceId');
  update_device_id(req, res);

  console.log("Request from:" + req.url);

});

app.post('/update_retailer_data', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  update_retailer_data = require('./updateRetailerData');
  update_retailer_data(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_search_product', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_search_product = require('./magentoSearchProduct');
  magento_search_product(req, res);

  console.log("Request from:" + req.url);

});

app.post('/upload', upload.single('imageFile'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  //  console.log("req.file", req.file);

  //  console.log("req.file : ", req.file);
  console.log('request : ', req.body);
  res.send('Image Saved!');

})

app.post('/verifiication_complete', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  verifiication_complete = require('./completeVerification');
  verifiication_complete(req, res);


});

app.post('/check_in_perm', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  check_in_perm = require('./checkInPermanent');
  check_in_perm(req, res);
});

app.post('/magento_info_product', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400); // info with sku

  magentoProductInfo = require('./magentoProductInfo');
  magentoProductInfo(req, res);


});




app.post('/is_data_filled', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  is_data_filled = require('./isDataFilled');
  is_data_filled(req, res);

  console.log("Request from:" + req.url);

});

app.post('/display_retailer_details', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  display_retailer_details = require('./display_retailer_details');
  display_retailer_details(req, res);


});

app.post('/update_product', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  product_details_update = require('./updateProduct');
  product_details_update(req, res);


});

app.post('/update_retailer', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  retailer_details_update = require('./updatePermRetailer');
  retailer_details_update(req, res);


});


app.post('/add_retailer_info_perm', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  details_input_perm = require('./addRetailerInfoToPerm');
  details_input_perm(req, res);


});


app.post('/add_retailer_info_temp', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  details_input_temp = require('./addRetailerInfoToTemp');
  details_input_temp(req, res);


});

app.post('/check_in_temp', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  check_in_temp = require('./checkInTemporary');
  check_in_temp(req, res);

});

app.post('/verify_email_id', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  verify_email = require('./verifyEmail');
  verify_email(req, res);

});

app.post('/magento_product_display', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoDisplayProduct = require('./magentoProductDisplay'); // display with category
  magentoDisplayProduct(req, res);

});

app.post('/magento_product_add', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoAddProduct = require('./magentoProductAdd');
  magentoAddProduct(req, res);

});

app.post('/magento_product_update', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoUpdateProduct = require('./magentoProductUpdate');
  magentoUpdateProduct(req, res);

});

app.post('/magento_get_attributes', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoAttributesGet = require('./magentoGetAttributes');
  magentoAttributesGet(req, res);


});

app.post('/magento_get_attribute_set', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoAttributeSetGet = require('./magentoGetAttributeSet');
  magentoAttributeSetGet(req, res);


});

app.post('/magento_get_attribute_group', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoGetAttributeGroup = require('./magentoGetAttributeGroup');
  magentoGetAttributeGroup(req, res);


});

app.post('/magento_get_category', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);

  magentoCategoryGet = require('./magentoGetCategory');
  magentoCategoryGet(req, res);


});


app.listen(6868);
