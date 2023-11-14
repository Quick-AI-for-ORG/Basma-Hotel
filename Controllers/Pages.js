const ctrlRooms = require('../Controllers/ctrlRooms')
const ctrlReservations = require('../Controllers/ctrlReservations')

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
const dashboard = (req, res) => {
  res.render("dashboard", { layout: false });
}
const myProfile = async (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/guest/login");
  } else {
    console.log(req.session.user)
    await ctrlReservations.guest.getUserReservations(req,res).then((result)=>{
      res.render("myProfile", {
        layout: false,
        user: req.session.user === undefined ? "" : req.session.user,
        reservations: result,
      });
  })
}
};


const viewRooms = async (req, res) => {
  let pageNumber = parseInt(req.params.page);
  let rooms = null
  let result = await ctrlRooms.public.getRooms()
  if(pageNumber>result.length/6) pageNumber = result.length/6;
  if(pageNumber<1) pageNumber = 1;
  rooms = result
  rooms=result.slice((pageNumber-1)*6, ((pageNumber-1)*6)+6);
  res.render('allRooms', {  user: (req.session.user === undefined ? "" : req.session.user) ,
  rooms: (rooms === null ? "" : rooms),
  current_page: Math.ceil(pageNumber),
  total_page: Math.ceil(result.length/6)})
};

const viewRoom = async (req, res) => {
  let room = null
  await ctrlRooms.public.getRoom(req,res).then((result)=>{
    room = result
    res.render('room', {  user: (req.session.user === undefined ? "" : req.session.user) ,
    room: (room === null ? "" : room)})
  })
  }

  const covid = (req, res) => {
    res.render("covid-19");
  }

module.exports = {
  public: { basma, about, facilities, privacy, covid,login, signup, viewRooms,viewRoom },
  guest: { bookings, myProfile },
  admin: {dashboard}
};
