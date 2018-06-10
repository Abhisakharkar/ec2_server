var express= require('express');

var bodyParser = require('body-parser');

var app=express();
var jsonParser = bodyParser.json();

var mkdirp=require('mkdirp');

//const express = require('express')
//const app = express()
var multer  = require('multer');
var upload = multer({ dest: 'tempDir/' });
var fs = require('fs');
var type = upload.single('recfile');

app.post('/upload', type , function (req, res) {

  console.log(req.headers);
  console.log(req);

  var tmp_path = req.file.path;
  var target_path = 'tempDir/' +  req.file.originalName;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() {res.render('complete'); });
  src.on('error', function(err) {res.render('error'); });



/*
  console.log("req.file : ", req.file);
  res.send('Image Saved!');
*/
});

app.post('/verifiication_complete', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    verifiication_complete=require('./completeVerification');
    verifiication_complete(req,res);


  });

app.post('/check_in_perm', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    check_in_perm=require('./checkInPermanent');
    check_in_perm(req,res);


  });

app.post('/magento_info_product', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoProductInfo=require('./magentoProductInfo');
    magentoProductInfo(req,res);


  });

app.post('/add_product', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    product_details_entry = require('./addProduct');
    product_details_entry(req,res);


  });

app.post('/display_product_details', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    display_product_details = require('./display_product_details');
    display_product_details(req,res);


  });

app.post('/is_data_filled', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    is_data_filled = require('./isDataFilled');
    is_data_filled(req,res);


  });

app.post('/display_retailer_details', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    display_retailer_details = require('./display_retailer_details');
    display_retailer_details(req,res);


  });

app.post('/update_product', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    product_details_update = require('./updateProduct');
    product_details_update(req,res);


  });

app.post('/update_retailer', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    retailer_details_update = require('./updatePermRetailer');
    retailer_details_update(req,res);


  });


app.post('/add_retailer_info_perm', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    details_input_perm=require('./addRetailerInfoToPerm');
    details_input_perm(req,res);


  });


app.post('/add_retailer_info_temp', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    details_input_temp=require('./addRetailerInfoToTemp');
    details_input_temp(req,res);


  });

app.post('/check_in_temp', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    check_in_temp=require('./checkInTemporary');
    check_in_temp(req,res);

  });

app.post('/verify_email_id', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    verify_email=require('./verifyEmail');
    verify_email(req, res);

  });
  
app.post('/magento_product_display', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoDisplayProduct = require('./magentoProductDisplay');
    magentoDisplayProduct(req,res);

  });

app.post('/magento_product_add', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoAddProduct = require('./magentoProductAdd');
    magentoAddProduct(req,res);

  });

app.post('/magento_product_update', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoUpdateProduct = require('./magentoProductUpdate');
    magentoUpdateProduct(req,res);

  });

app.post('/magento_get_attributes', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoAttributesGet = require('./magentoGetAttributes');
    magentoAttributesGet(req,res);


  });

app.post('/magento_get_attribute_set', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoAttributeSetGet = require('./magentoGetAttributeSet');
    magentoAttributeSetGet(req,res);


  });

app.post('/magento_get_attribute_group', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoGetAttributeGroup = require('./magentoGetAttributeGroup');
    magentoGetAttributeGroup(req,res);


  });

app.post('/magento_get_category', jsonParser, function (req, res) {
    console.log("Request from:"+req.url);
    if (!req.body) return res.sendStatus(400);

    magentoCategoryGet = require('./magentoGetCategory');
    magentoCategoryGet(req,res);


  });


app.listen(6868);
