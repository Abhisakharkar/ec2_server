var get_sub_locality_2=function (res,con,subLocality2,googleSubLocality2Id,localityId,subLocality1Id,length,localityTier,subLocality1Tier) {
  var subLocality2Id;
  var subLocality2Tier;
  con.query("SELECT `subLocality2Id`, `tier` FROM `SUB_LOCALITY_2_ID` WHERE `googleSubLocality2Id` = ? ",[googleSubLocality2Id]  , function(err, rows){
    if(err) {
      console.log(err);
      console.log("error in sub locality 2 search");
    }
    else {
      if (rows.length) {
        subLocality2Id=rows[0].subLocality2Id;
        subLocality2Tier=rows[0].tier;
        var myObj={
          status:'ok',
          length:length,
          localityId:localityId,
          localityTier:localityTier,
          subLocality1Id:subLocality1Id,
          subLocality1Tier,
          subLocality2Id:subLocality2Id,
          subLocality2Tier
        }
        console.log(myObj);
        res.end(JSON.stringify(myObj));
      }
      else {
        con.query("INSERT INTO `SUB_LOCALITY_2_ID` (`subLocality2Id`, `subLocality2`, `googleSubLocality2Id`, `subLocality1Id`, `tier`) VALUES (NULL, ?, ?, ?, '0')",[subLocality2,googleSubLocality2Id,subLocality1Id]  , function(err, rows1){
          if(err) {
            console.log(err);
            console.log("error in sub locality 2 insertion");
          }
          else {
            subLocality2Id=rows1.insertId;
            subLocality2Tier=0;
            var myObj={
              status:'ok',
              length:length,
              localityId:localityId,
              localityTier:localityTier,
              subLocality1Id:subLocality1Id,
              subLocality1Tier:subLocality1tier,
              subLocality2Id:subLocality2Id,
              subLocality2Tier:subLocality2Tier
            }
            console.log(myObj);
            res.end(JSON.stringify(myObj));
          }
        });
      }
    }
  });

}
module.exports=get_sub_locality_2;
