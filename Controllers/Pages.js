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
  if(req.session.user === undefined){
    res.redirect('/guest/login')
  }
else{
  res.render("myProfile", {
    layout: false,
    user: req.session.user === undefined ? "" : req.session.user,
  });
}
};
module.exports = {
  root: { basma, about, facilities, privacy },
  guest: { login, signup, bookings, myProfile },
};
