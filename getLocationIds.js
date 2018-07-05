var get_location_id=function (req, res) {
  var latloc=req.body.latloc;
  var longloc=req.body.longloc;
  var latlngloc=latloc+","+longloc;

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MH31eh@2964",
  database: "hoverBackend"
});

var apiKey='AIzaSyD936hIXMiYNq60MZ2mqXXuS_2TsM38Q-U';

var rp = require('request-promise');
var options = {
    uri: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
        latlng:latlngloc, // -> uri + '?access_token=xxxxx%20xxxxx'
        result_type:'locality|sublocality_level_1|sublocality_level_2',
        key:apiKey
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
.then(function (api) {
    var length = api.results.length;
    var locality;
    var googleLocalityId;
    var subLocality1;
    var googleSubLocality1Id;
    var subLocality2;
    var googleSubLocality2Id;
    var localityId;
    var localityTier;
    var myObj={};
    if (length==3) {
      locality=api.results[2].formatted_address;
      googleLocalityId=api.results[2].place_id;
      subLocality1=api.results[1].address_components[0].long_name;
      googleSubLocality1Id=api.results[1].place_id;
      subLocality2=api.results[0].address_components[0].long_name;
      googleSubLocality2Id=api.results[0].place_id;
    }
    else if (length==2) {
      locality=api.results[1].formatted_address;
      googleLocalityId=api.results[1].place_id;
      subLocality1=api.results[0].address_components[0].long_name;
      googleSubLocality1Id=api.results[0].place_id;
    }
    else if (length==1) {
      locality=api.results[0].formatted_address;
      googleLocalityId=api.results[0].place_id;
    }
    else {
      var myObj={
        status:'failed no address for this coordinate'
      }
      console.log(myObj);
      res.end(JSON.stringify(myObj));
                 //send wrong coordinates
    }
    console.log(googleLocalityId);

    con.connect(function (err) {
      if (err) {
        console.log("error in database connect");
      }else {
        con.query("SELECT `localityId`, `tier`, `locality`, `wholesaleTier` FROM `LOCALITY_ID` WHERE `googleLocalityId` = ? ",[googleLocalityId]  , function(err, rows){
          if(err) {
            console.log(err);
            console.log("error in locality search");
          }
          else {
            get_sub_locality_1 = require('./getSubLocality1');
            myObj.length=length;
            if (rows.length) {
              myObj.localityData=rows[0];
              if (length>1) {
                get_sub_locality_1(res,con,myObj,subLocality1,googleSubLocality1Id,subLocality2,googleSubLocality2Id);
              }
              else {
                console.log(myObj);
                res.end(JSON.stringify(myObj));
              }
            }
            else {
              con.query("INSERT INTO `LOCALITY_ID` (`localityId`, `locality`, `googleLocalityId`, `tier`, `wholesaleTier`) VALUES (NULL, ?, ?, '0', '0')",[locality,googleLocalityId]  , function(err, rows1){
                if(err) {
                  console.log(err);
                  console.log("error in locality insertion");
                }
                else {
                  var localityData={
                    localityId:rows1.insertId,
                    tier:0,
                    locality:locality,
                    wholesaleTier:0
                  }
                  myObj.localityData=localityData;
                  if (length>1) {
                    get_sub_locality_1(res,con,myObj,subLocality1,googleSubLocality1Id,subLocality2,googleSubLocality2Id);
                  }
                  else {
                    console.log(myObj);
                    res.end(JSON.stringify(myObj));
                  }
                }
              });
            }
          }
        });
      }
    });
})
.catch(function (err) {
        // API call failed...
  console.log("error in reverse geocoding api response");
});

}
module.exports=get_location_id;

//https://maps.googleapis.com/maps/api/geocode/json?latlng=19.848301,79.345909&result_type=locality|sublocality_level_1|sublocality_level_2&key=AIzaSyD936hIXMiYNq60MZ2mqXXuS_2TsM38Q-U


//
// con.query("INSERT INTO `LOCALITY_ID` (`localityId`, `locality`, `googleLocalityId`, `tier`) VALUES (NULL, ?, ?, '0')",[locality,googleLocalityId]  , function(err, rows){
//   if(err) {
//     console.log(err);
//     console.log("error in locality insertion");
//   }
//   else {
//     localityId=rows.insertId;
//   }
//   if (length==2) {
//     con.query("INSERT INTO `LOCALITY_ID` (`localityId`, `locality`, `googleLocalityId`, `tier`) VALUES (NULL, ?, ?, '0')",[locality,googleLocalityId]  , function(err, rows){
//         console.log(err);
//         console.log("error in locality insertion");
//       }
//       if(err) {
//       else {
//         localityId=rows.insertId;
//       }
//   }
