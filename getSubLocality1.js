var get_sub_locality_1=function (res,con,subLocality1,googleSubLocality1Id,subLocality2,googleSubLocality2Id,localityId,length,localityTier) {
  var subLocality1Id;
  con.query("SELECT `subLocality1Id`, `tier` FROM `SUB_LOCALITY_1_ID` WHERE `googleSubLocality1Id` = ? ",[googleSubLocality1Id]  , function(err, rows){
    if(err) {
      console.log(err);
      console.log("error in sub locality 1 search");
    }
    else {
      get_sub_locality_2=require('./getSubLocality2');
      if (rows.length) {
        subLocality1Id=rows[0].subLocality1Id;
        subLocality1Tier=rows[0].tier;
        if (length>2) {
          get_sub_locality_2(res,con,subLocality2,googleSubLocality2Id,localityId,subLocality1Id,length,localityTier,subLocality1Tier);
        }
        else {
          var myObj={
            status:'ok',
            length:length,
            localityId:localityId,
            localityTier:localityTier,
            subLocality1Id:subLocality1Id,
            subLocality1Tier:subLocality1Tier
          }
          console.log(myObj);
          res.end(JSON.stringify(myObj));
        }
      }
      else {
        con.query("INSERT INTO `SUB_LOCALITY_1_ID` (`subLocality1Id`, `subLocality1`, `googleSubLocality1Id`, `localityId`, `tier`) VALUES (NULL, ?, ?, ?, '0')",[subLocality1,googleSubLocality1Id,localityId]  , function(err, rows1){
          if(err) {
            console.log(err);
            console.log("error in sub locality 1 insertion");
          }
          else {
            subLocality1Id=rows1.insertId;
            subLocality1Tier=0;
            if (length>2) {
              get_sub_locality_2(res,con,subLocality2,googleSubLocality2Id,localityId,subLocality1Id,length,localityTier,subLocality1Tier);
            }
            else {
              var myObj={
                status:'ok',
                length:length,
                localityId:localityId,
                localityTier:localityTier,
                subLocality1Id:subLocality1Id,
                subLocality1Tier:subLocality1Tier
              }
              console.log(myObj);
              res.end(JSON.stringify(myObj));
            }
          }
        });
      }
    }
  });

}
module.exports=get_sub_locality_1;
