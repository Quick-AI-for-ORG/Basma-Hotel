const ctrlRooms = require("../Controllers/ctrlRooms");
const ctrlReservations = require("../Controllers/ctrlReservations");
const ctrlOptions = require("../Controllers/ctrlOptions");
const ctrlUsers = require("../Controllers/ctrlUsers");
const ctrlStaff = require("../Controllers/ctrlStaff");
const ctrlCharacteristics = require("../Controllers/ctrlCharacteristics");

const login = (req, res) => {
  res.render("login", { layout: false });
};
const signup = (req, res) => {
  res.render("signup", { layout: false });
};
const basma = (req, res) => {
  res.render("basma", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null
  });
};
const about = (req, res) => {
  res.render("aboutUs", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null
  });
};
const facilities = (req, res) => {
  res.render("facilities", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null
  });
};
const privacy = (req, res) => {
  res.render("privacyPolicy", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null
  });
};
const dashboard = (req, res) => {
  res.render("dashboard", {
    layout: false,
    user: req.session.user === undefined ? "" : req.session.user,
  });
};
const guests = async (req, res) => {
  try {
    const guestsData = await ctrlStaff.staff.getAll();

    res.render("guests", {
      layout: false,
      user: req.session.user === undefined ? "" : req.session.user,
      guests: guestsData || [],
    });
  } catch (error) {
    console.error("Error fetching guests data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const rooms = async (req, res) => {
  try {
    const roomsData = await ctrlRooms.admin.getRooms();

    res.render("rooms", {
      layout: false,
      user: req.session.user === undefined ? "" : req.session.user,
      rooms: roomsData === null ? "" : roomsData,
    });
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    res.status(500).send("Internal Server Error");
  }
};
const characteristics = async (req, res) => {
  try {
    const characteristicsData =
      await ctrlCharacteristics.admin.getCharacteristics();

    res.render("charecteristics", {
      layout: false,
      user: req.session.user === undefined ? "" : req.session.user,
      characteristics: characteristicsData === null ? "" : characteristicsData,
    });
  } catch (error) {
    console.error("Error fetching characteristics data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const myProfile = async (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/user/login");
  } else {
    console.log(req.session.user);
    await ctrlReservations.guest
      .getUserReservations(req, res)
      .then((result) => {
        res.render("myProfile", {
          layout: false,
          user: req.session.user === undefined ? "" : req.session.user,
          reservations: result === null ? [] : result,
        });
      });
  }
};

const viewRooms = async (req, res) => {
  let pageNumber = parseInt(req.params.page);
  if (!pageNumber) pageNumber = 1;
  let rooms = null;
  let result = await ctrlRooms.public.getRooms();
  if (pageNumber > result.length / 6) pageNumber = result.length / 6;
  if (pageNumber < 1) pageNumber = 1;
  rooms = result;
  rooms = result.slice((pageNumber - 1) * 6, (pageNumber - 1) * 6 + 6);
  res.render("allRooms", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: rooms === null ? "" : rooms,
    current_page: Math.ceil(pageNumber),
    total_page: Math.ceil(result.length / 6),
  });
};

const viewRoom = async (req, res) => {
  let room = null,
    characteristics = null;
  await ctrlRooms.public.getRoom(req, res).then(async (result) => {
    room = result;
    if (room === null) res.redirect("/room");
    characteristics = await ctrlRooms.public.getRoomCharacteristics(req, res);
    res.render("room", {
      user: req.session.user === undefined ? "" : req.session.user,
      room: room === null ? "" : room,
      characteristics: characteristics === null ? "" : characteristics,
      rooms: null
    });
  });
};

const covid = (req, res) => {
  res.render("covid-19");
};
const logout = (req, res) => {
  if (req.session.user !== undefined) req.session.destroy();
  res.redirect("/");
};

const booking = async (req, res) => {
 let records = await ctrlOptions.admin.getOptions(req, res)
    if (req.session.user !== undefined)
      res.render("booking", {
        user: req.session.user,
        roomTitle: req.body.roomTitle,
        arrivalDate: req.body.arrivalDate,
        departureDate: req.body.departureDate,
        options: records=== null ? "" :records,
        rooms: null
      });
    else res.redirect("/user/login");
};

const payment = async (req, res) => {
  if (req.session.user !== undefined)
    res.render("payment", {
      user: req.session.user,
      room: await ctrlRooms.public.sessionedRoom(req, res),
      reservation: await ctrlReservations.guest.sessionedReservation(req, res),
      options: await ctrlReservations.guest.getUserReservationOptions(req, res),
      rooms: null
    });
  else res.redirect("/user/login");
};

module.exports = {
  public: {
    basma,
    about,
    facilities,
    privacy,
    covid,
    viewRooms,
    viewRoom,
  },
  user: { myProfile , logout,login, signup, },
  guest:{booking,payment},
  admin: { dashboard, guests, rooms, characteristics },
};
