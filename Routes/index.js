const express = require("express");
const router = express.Router();
const pages = require("../Controllers/Pages");
const questions = require("../Controllers/ctrlQuestions");

router.get("/", pages.public.basma);
router.get("/aboutus", pages.public.about);
router.get("/facilities", pages.public.facilities);
router.get("/privacyPolicy", pages.public.privacy);
router.get("/covid-19", pages.public.covid);
router.post("/askQuestion", questions.guest.askQuestion);
module.exports = router;
