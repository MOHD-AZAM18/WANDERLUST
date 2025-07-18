const express = require("express");
const router = express.Router();
const path = require("path")
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn , isowner, validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer');


const{storage} = require("../cloudConfig.js");
const upload = multer({ storage});


router
  .route("/")
.get(  wrapAsync(listingController.index))
.post( isLoggedIn ,  upload.single("listing[image]"), validatelisting ,  wrapAsync(listingController.creteListing));




  

//New Route
router.get("/new", isLoggedIn , listingController.renderNewForm);


router.route("/:id")
.get(  wrapAsync (listingController.showListing))
.put( isLoggedIn, isowner , upload.single("listing[image]"), validatelisting , wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isowner , wrapAsync(listingController.destroyListing));


  //Edit Route
router.get("/:id/edit", isLoggedIn, isowner ,wrapAsync(listingController.renderEditForm));




  module.exports = router;