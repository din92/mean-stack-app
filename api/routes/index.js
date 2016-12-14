var app = require("express");
var router = app.Router();

var ctrlHotels = require("../controllers/hotel.controller.js");
var ctrlReviews = require("../controllers/review.controller.js");
var ctrlUser = require("../controllers/users.controller.js");
router
  .route('/hotels')
  .get(ctrlHotels.GetAllHotels)
  .post(ctrlHotels.AddOneHotel);

router
    .route("/hotels/:hotelID")
    .get(ctrlHotels.GetOneHotel)
    .put(ctrlHotels.updateHotel)
    .delete(ctrlHotels.deleteHotel);

//Defining routes for hotel reviews
router
  .route('/hotels/:hotelID/reviews')
  .get(ctrlReviews.getAllReviews)
  .post(ctrlUser.authenticateUser,ctrlReviews.AddOneReviewForHotel);

router
  .route('/hotels/:hotelID/reviews/:reviewID')
  .get(ctrlReviews.getOneReview)
  .put(ctrlReviews.updateReview)
  .delete(ctrlReviews.deleteReview);

//login & Register for the user
router
  .route('/users/login')
  .post(ctrlUser.loginUser);
  
router
  .route('/users/register')
  .post(ctrlUser.registerUser);

router
  .route('/users/:username')
  .get(ctrlUser.findUser);
    

module.exports = router;


