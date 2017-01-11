var mongoose = require("mongoose")
var schema = mongoose.model("Hotel");

module.exports.getAllReviews = function(req,res){
var hotelid = req.params.hotelID;
  console.log('GET all the reviews for the hotel');
  console.log(req.query);
 schema
    .findById(hotelid)
    .select("reviews")
    .exec(function(err, hotel) {
      //console.log("Found hotels", hotels.length);
      if(err)
      {
          console.log("Error in finding review for the hotel");
          res
            .status(500)
            .json(err);
      }
      else
      {
       res
        .status(200)
        .json(hotel.reviews);   
      }
      
  });
 
}

module.exports.getOneReview = function(req,res)
 {
  // var db = dbcon.get();
   var hotelid = req.params.hotelID;
   var reviewid = req.params.reviewID;
   console.log("Hotel ID: "+hotelid+" Review id "+reviewid);
 
   schema
    .findById(hotelid)
    .select("reviews")
    .exec(function(err, hotel) {
     // console.log("Hotel found "+hotels.length);
     if(err)
     {
         console.log("Error in getting review for the id");
         res
        .status(500)
        .json(err);
         

     }
     else if(!hotel){
         res
        .status(200)
        .json({"message":"Hotel cannot be found for the id"});
     }
     else{
     var review = hotel.reviews.id(reviewid)
      res
        .status(200)
        .json(review);
     }
     
  });

}

module.exports.AddOneReviewForHotel = function(req,res){
//console.log("Post a new review for the hotel");
console.log("Inside AddOneReviewForHotel");
console.log(req.body);
var id = req.params.hotelID;
console.log(id);
  console.log('POST review to hotelID', id);

  schema
    .findById(id)
    .select('reviews')
    .exec(function(err, doc) 
    {
      var response = {
        status : 200,
        message : doc
      };
      if (err) 
      {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc)
       {
        console.log("HotelId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      if (doc) {
        _addReview(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });

}
var _addReview = function (req,res,hotel)
{
   hotel.reviews.push({
    name : req.body.name,
    rating : parseInt(req.body.rating, 10),
    review : req.body.review
  });

  hotel.save(function(err,hotelUpdated){
      if(err){
          console.log("Error in saving review to the Db");
          res
            .status(500)
            .json(err);
      }
      else{
          console.log("Review added for the hotel");
           res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);

      }
  });
}


module.exports.updateReview = function(req,res)
{
    console.log("Updating review for the hotel");
  // var db = dbcon.get();
   var id = req.params.hotelID;
   var reviewid = req.params.reviewID;
   console.log(id);
   schema
    .findById(id)
    .select("reviews")
    .exec(function(err, doc) {
        var _review;
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
         _review = doc.reviews.id(reviewid);
        _review.name =req.body.name;
        console.log("Review Name "+doc.reviews.name)
       _review.rating = parseInt(req.body.rating,10);
        _review.review = req.body.review;
       // doc.reviews.id(reviewid)=_review;
     }
     doc.save(function(err,updatedHotel){
        if(err)
        {
          res
          .status(500)
          .json(err);
        }
        else{
          console.log("Hotel review updated");
          res
            .status(204)
            .json(_review);
        }
     });
  });
}

module.exports.deleteReview = function(req,res)
{

  // var db = dbcon.get();
   var hotelid = req.params.hotelID;
   var reviewid = req.params.reviewID;
   console.log("Hotel ID: "+hotelid+" Review id "+reviewid);
 
   schema
    .findById(hotelid)
    .select("reviews")
    .exec(function(err, hotel) {
     // console.log("Hotel found "+hotels.length);
     if(err)
     {
         console.log("Error in getting review for the id");
         res
        .status(500)
        .json(err);
     }
     else if(!hotel){
         res
        .status(200)
        .json({"message":"Hotel cannot be found for the id"});
     }
     else{
      hotel.reviews.id(reviewid).remove();
      hotel.save(function(err,updatedHotel){
          if(err){
              console.log("Error removing the review");
              res
                .status(500)
                .json(err);
          }
          else{
             res
        .status(200)
        .json(updatedHotel); 
          }
      });
      
     }
     
  });
}