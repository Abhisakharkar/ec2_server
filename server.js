var express = require('express');
var bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
var app = express();
var jsonParser = bodyParser.json();
var mkdirp = require('mkdirp');
var retailerIdForImage;


//const express = require('express')
//const app = express()
var multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) =>  {
    if(file.originalname.split('.')[0]=='sp' || file.originalname.split('.')[0]=='dp'){
      mkdirp('/var/www/html/public/' + retailerIdForImage, function(err) {
        if (err) {
        console.log("error making directory");
        }
        else {
          console.log("directory made in public");
            cb(null, '/var/www/html/public/' + retailerIdForImage)
        }
      });
    }else if (file.originalname.split('.')[0]=='lp')
     {
      mkdirp('/var/www/html/private/' + retailerIdForImage, function(err) {
        if (err) {
        console.log("error making directory");
        }
        else {
          console.log("directory made in private");
          cb(null, '/var/www/html/private/' + retailerIdForImage)
        }
      });
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split('.')[0] + '.' + file.mimetype.split('/')[1])
  }
});
var upload = multer({
  storage: storage
})

app.post('/upload',verifyForImage,upload.single('imageFile'), function(req, res, next) {
  retailerIdForImage=null;
  res.send('Image Saved!');
});


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

app.post('/sign_in', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  sign_in = require('./signIn');
  sign_in(req, res);
});

app.post('/verify_mail', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      verify_mail = require('./verifyMail');
      verify_mail(req, res, authData);
    }
  });
});
app.post('/check_device_id', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      check_device_id = require('./checkDeviceId');
      check_device_id(req, res, authData);
    }
  });
});
app.post('/resend_verification_code', jsonParser, verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      resend_verification_code = require('./resendVerificationCode');
      resend_verification_code(req, res, authData);
    }
  });
});

app.post('/get_location_ids', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
      get_location_ids = require('./getLocationIds');
      get_location_ids(req, res);
});



app.post('/add_retailer_product', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      add_retailer_product = require('./addRetailerProduct');
      add_retailer_product(req, res,authData);
    }
  });
});

app.post('/update_retailer_product', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_retailer_product = require('./updateRetailerProduct');
      update_retailer_product(req, res,authData);
    }
  });
});
app.post('/display_products_associated_with_retailer_id', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      display_products_associated_with_retailer_id = require('./displayProductsAssociatedWithRetailerId');
      display_products_associated_with_retailer_id(req, res,authData);
    }
  });
});

app.post('/update_device_id', jsonParser,verifyToken, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_device_id = require('./updateDeviceId');
      update_device_id(req, res, authData);
    }
    console.log("Request from:" + req.url);
  });
});

app.post('/update_full_auth_data', jsonParser,verifyToken, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_full_auth_data = require('./updateFullAuthData');
      update_full_auth_data(req, res, authData);
    }
    console.log("Request from:" + req.url);
  });
});

app.post('/update_full_retailer_data', jsonParser,verifyToken, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_full_retailer_data = require('./updateFullRetailerData');
      update_full_retailer_data(req, res, authData);
    }
    console.log("Request from:" + req.url);
  });
});

app.post('/update_retailer_profile_data', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  update_retailer_profile_data = require('./updateRetailerProfileData');
  update_retailer_profile_data(req, res);
  console.log("Request from:" + req.url);
});

app.post('/update_retailer_timing_data', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  update_retailer_timing_data = require('./updateRetailerTimingData');
  update_retailer_timing_data(req, res);
  console.log("Request from:" + req.url);
});

app.post('/update_auth_data', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  update_auth_data = require('./updateAuthData');
  update_auth_data(req, res);
  console.log("Request from:" + req.url);
});


app.post('/magento_search_product', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_search_product = require('./magentoSearchProduct');
  magento_search_product(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_search_in_category', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_search_in_category = require('./magentoSearchInCategory');
  magento_search_in_category(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_get_attribute_with_group', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_get_attribute_with_group = require('./magentoGetAttributeWithGroup');
  magento_get_attribute_with_group(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_get_categories', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_get_categories = require('./magentoGetCategories');
  magento_get_categories(req, res);

  console.log("Request from:" + req.url);

});


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

function verifyToken(req,res,next) {
  const bearerHeader =req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken= bearer[1];
    req.token = bearerToken;
    next();
  }else {
    res.sendStatus(403);
  }
}

function verifyForImage(req,res,next) {
  const bearerHeader =req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
   const bearer = bearerHeader.split(' ');
   const bearerToken= bearer[1];
   req.token =bearerToken;
    jwt.verify(req.token,'abhishek_007',(err,authData)=>{
      if (err) {
        res.sendStatus(403);
      }else {
        retailerIdForImage=authData.data.retailerId;
        next();
      }
    });
  }else {
    res.sendStatus(403);
  }
}

app.listen(6868);
