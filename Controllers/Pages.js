const {Room} = require('../Models/Room.js')

const login = (req, res) => {
  res.render("login", { layout: false });
};
const signup = (req, res) => {
  res.render("signup", { layout: false });
};
const bookings = (req, res) => {
  res.render("myBookings");
};
const basma = (req, res) => {
  res.render("basma");
};
const about = (req, res) => {
  res.render("aboutUs");
};
const facilities = (req, res) => {
  res.render("facilities");
};
const privacy = (req, res) => {
  res.render("privacyPolicy");
};
const myProfile = (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/guest/login");
  } else {
    res.render("myProfile", {
      layout: false,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }
};


const rooms = (req, res) => {
  let pageNumber = parseInt(req.params.page);
  let rooms = null
  Room.findAll().then(result =>{
  if(pageNumber>result.length/6) pageNumber = result.length/6;
  if(pageNumber<1) pageNumber = 1;
  rooms=result.slice((pageNumber-1)*6, ((pageNumber-1)*6)+6);
  res.render('allRooms', {  user: (req.session.user === undefined ? "" : req.session.user) ,
  rooms: (rooms === null ? "" : rooms),
  current_page: pageNumber,
  total_page: Math.ceil(result.length/6)})
  }
  ).catch(err => {console.log(err)}).then()
};
const covid = (req, res) => {
  res.render("covid-19");
};

module.exports = {
  root: { basma, about, facilities, privacy, rooms,covid },
  guest: { login, signup, bookings, myProfile },
};
