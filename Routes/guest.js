require("dotenv").config();
const express = require("express");
const router = express.Router();
const pages = require("../Controllers/Pages");
const ctrlGuests = require("../Controllers/ctrlGuests");
const ctrlReservations = require("../Controllers/ctrlReservations");




router.get("/", pages.guest.myProfile);
router.get("/login", pages.public.login);
router.get("/signup", pages.public.signup);
router.get("/logout", pages.guest.logout);
router.post("/booking", pages.guest.booking);
router.post("/register", ctrlGuests.public.register);
router.post("/login", ctrlGuests.public.login);
router.post("/delete", ctrlGuests.admin.deleteGuest);
router.post("/update", ctrlGuests.guest.updateGuest);
router.post("/updateBio", ctrlGuests.guest.updateBio);
router.post("/reserve", ctrlReservations.guest.reserve);
router.post("/checkAvailability", ctrlReservations.guest.checkAvailability);
router.post("/checkMail", ctrlGuests.public.checkMail);
router.post("/checkLogin", ctrlGuests.public.checkLogin);
router.get('/auth/facebook', ctrlGuests.public.facebookLogin);

// Callback URL for handling the Facebook Login response
router.get('/auth/facebook/callback',ctrlGuests.public.facebookLoginCallback);
  



module.exports = router;
