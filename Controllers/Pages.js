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
  res.render("allRooms");
};
const covid = (req, res) => {
  res.render("covid-19");
};

module.exports = {
  root: { basma, about, facilities, privacy, rooms,covid },
  guest: { login, signup, bookings, myProfile },
};
