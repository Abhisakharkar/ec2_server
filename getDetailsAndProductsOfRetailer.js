var get_details_and_product_of_retailer = function (req,res) {

  var retailerData=null;
  var retailerProduct=null;
  var data=false;
  var prod=false;
  var con= require('./databaseOptions')
  if (req.body.retailerId==null){
    res.sendStatus(400);
  }else {
    var retailerId=req.body.retailerId;
      var sql = "SELECT `retailerId`, `enterpriseName`, `mobileNo`, `addLine1`, SUB_LOCALITY_1_ID.subLocality1, LOCALITY_ID.locality, `shopPhoto`, `latloc`, `longloc`, `deliveryStatus`, `openCloseIsManual`, `shopOpenTime1`, `shopCloseTime1`, `shopOpenTime2`, `shopCloseTime2`, `currentState`, `lastStatusUpdate`, `verifiedByTeam` FROM `RETAILER_DATA` INNER JOIN LOCALITY_ID ON RETAILER_DATA.localityId = LOCALITY_ID.localityId INNER JOIN SUB_LOCALITY_1_ID ON RETAILER_DATA.subLocality1Id = SUB_LOCALITY_1_ID.subLocality1Id WHERE `retailerId` = ?";
      con.query(sql,retailerId, function(err, rows) {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        }
        else {
            retailerData=rows[0];
            data=true;
            addData();
        }
      });
      var sql = "SELECT retailerId, productId, price FROM RET_PROD_ID WHERE retailerId = ? AND availability = ?";
      con.query(sql,[retailerId,1], function(err, rows) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
            retailerProduct=rows;
            prod=true;
            addData();
        }
      });
    }

function addData() {
  var myObj={
    retailerData,
    retailerProduct
  }
  if(prod && data){
    console.log(myObj);
    res.send(JSON.stringify(myObj));
  }

}

}
module.exports=get_details_and_product_of_retailer;
