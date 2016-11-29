//Hardcoded json data
//var hotelsData = require('../data/hotel-data.json')

//-----using mongodb native driver--------------
//var dbcon = require("../data/dbconnection");
//var ObjectId = require("mongodb").ObjectId;
//var dbopen = dbcon.open;

//----using mongoose schema to query the mongodb----
var mongoose = require("mongoose")
var schema = mongoose.model("Hotel");
var maxcount =10;
var getGeo = function(req,res){

var lat = parseFloat(req.query.lat,10);
var long = parseFloat(req.query.long,10);

//creating json point
var point = {
  type:"Point",
coordinates:[lat,long]
} 
var geoOptions = {
  spherical:true,
maxDistance:2000,
num:5
} 
schema
  .geoNear(point,geoOptions,function (err,results,stats) {
    console.log("Geo Results "+ results);
    console.log("Geo stats "+ stats);
    if(err)
    {console.log("Error in finding nearby Hotels");
      res
      .status(500)
      .json(err);
    }else{
       res
      .status(200)
      .json(results);
    }
   

  });
}

module.exports.GetAllHotels = function(req,res){
console.log("Inside getallhotels");
  //var db = dbcon.get();

  // console.log("db", db);
  console.log('GET the hotels');
  console.log(req.query);

  var offset = 0;
  var count = 5;

 // var collection = db.collection('hotels');

 if(req.query && req.query.lat & req.query.long)
 {
   if(isNaN(req.query.lat) || isNaN(req.query.long))
    {
      console.log("Latitude and longitude supplied are not numbers")
      res
      .status(400)
      .json({"message":"Latitude and longitude must be numbers"});
    }
    else
   getGeo(req,res);
   return;
 }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset.trim(), 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count.trim(), 10);
  }

   if(isNaN(offset) || isNaN(count))
    {
      console.log("Offset and count supplied are not numbers")
      res
      .status(400)
      .json({"message":"Offset and count must be numbers"});
      return;
    }

     if(count > maxcount)
    {
      console.log("Cannot retrieve more than "+maxcount+" hotels")
      res
      .status(400)
      .json({"message":"Cannot retrieve more than "+maxcount+" hotels"});
      return;
    }

 schema
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      if(err)
      {
        console.log("error finding hotels");
        res
          .status(500)
          .json(err)
      }
      else{
        console.log("Found hotels", hotels.length);
      res
        .status(200)
        .json(hotels);
      }
  });
  // collection
  //   .find()
  //   .skip(offset)
  //   .limit(count)
  //   .toArray(function(err, docs) {
  //     console.log("Found hotels", docs.length);
  //     res
  //       .status(200)
  //       .json(docs);
  // });

}

module.exports.GetOneHotel = function(req,res)
 {
   console.log("Inside getOnehotels");
  // var db = dbcon.get();
   var id = req.params.hotelID;
   console.log(id);
  // var collection = db.collection('hotels');
  // console.log('GET hotelId', id);

  // collection
  //   .findOne({
  //     _id : ObjectId(id)
  //   }, function(err, doc) {
  //     res
  //       .status(200)
  //       .json(doc);
  // });
   schema
    .findById(id)
    .exec(function(err, doc) {
     // console.log("Hotel found "+hotels.length);
     if(err)
     {
       console.log("Error in finding the hotel ");
       res
        .status(500)
        .json(err);
     }
     else if(!doc){
       res
        .status(404)
        .json({"message":" hotel not found for the id: "+id});
     }
     else{
       res
        .status(200)
        .json(doc);
     }
      
  });

}

module.exports.AddOneHotel = function(req,res){
console.log("Post a new hotel");
console.log(req.body);
// var dbget = dbcon.get();
// var collection = dbget.collection("hotels");
var stars; 
if(req.body && req.body.name && req.body.stars)
{ //newHotel = req.body; 
  //console.log(req.body.stars);
   stars = parseInt(req.body.stars,10);
   if(isNaN(stars))
   {
     console.log("Stars in the query is not a number");
     res
      .status(400)
      .json({"message":"Stars must be a number"});
      return;
   }
  schema.create({
     name :req.body.name,
  stars : stars,
  services : _splitArray(req.body.services),
  description : req.body.description,
  photos : _splitArray(req.body.photos),
  currency : req.body.currency,
  location : {
    address : req.body.address,
    coordinates : [parseFloat(req.body.long),parseFloat(req.body.lat)]
  }
  },
  function(err,response) {
    //console.log("Data successfully in database "+response.ops);
    if(err){
      console.log("Internal server error in storing the data");
      res
        .status(500)
        .json(err);
    }
    else if(!response)
    {
      console.log("Error storing the data");
      res
        .status(400)
        .json({"message":"Error storing the data"})
    }
    else{
      console.log("hotel created");
        res
        .status(201)
        .json(response);
   }
    });
}
else{
  console.log(req.body+" "+req.body.name+" "+redq.body.stars)
  console.log("Data  Cannot be stored");
  res
    .status(400)
    .json({message:"Missing data from the body"});
}

}
var _splitArray= function(arr){
    var output;
  if(arr && arr.length>0)
    output= arr.split(";");
  else
    output =[];
  return output;
}

module.exports.updateHotel = function(req,res){
  console.log("Updating data for the hotel");
  // var db = dbcon.get();
   var id = req.params.hotelID;
   console.log(id);
   schema
    .findById(id)
    .select("-reviews -rooms")
    .exec(function(err, doc) {
     if(err)
     {
       console.log("Error in finding the hotel ");
       res
        .status(500)
        .json(err);
     }
     else if(!doc){
       res
        .status(404)
        .json({"message":" hotel not found for the id: "+id});
     }
     else{
        doc.name = req.body.name;
        doc.stars = parseInt(req.body.stars);
        doc.services = _splitArray(req.body.services);
        doc.description = req.body.description;
        doc.photos = _splitArray(req.body.photos);
        doc.currency = req.body.currency;
        doc.location = {
        address : req.body.address,
          coordinates : [parseFloat(req.body.long),parseFloat(req.body.lat)] 
     }
     doc.save(function(err,updatedHotel){
        if(err)
        {
          res
          .status(500)
          .json(err);
        }
        else{
          console.log("Hotel data updated");
          res
            .status(204)
            .json(updatedHotel);
        }
     });
     }
  });
}

module.exports.deleteHotel = function(req,res){

  console.log("Inside deleteOnehotel");
  // var db = dbcon.get();
   var id = req.params.hotelID;
   console.log(id);
   schema
    .findByIdAndRemove(id)
    .exec(function(err, doc) {
     if(err)
     {
       console.log("Error in finding the hotel ");
       res
        .status(500)
        .json(err);
     }
     else if(!doc){
       res
        .status(404)
        .json({"message":" hotel not found for the id: "+id});
     }
     else{
       console.log("Hotel deleted")
       res
        .status(200)
        .json();
     }
      
  });
}