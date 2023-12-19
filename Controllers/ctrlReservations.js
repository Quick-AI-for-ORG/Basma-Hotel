const Reservation = require("../Models/Reservation");
const Option = require("../Models/Option");
const Room = require("../Models/Room");
const Guest = require("../Models/Guest");
const Staff = require("../Models/Staff");

const reserve = async (req, res) => {
  if (req.session.user === undefined || req.session.user.role != "Guest")
    res.redirect("/user/login");
  if (await checkAvailability(req, res)) {
    const numberOfGuests =
      parseInt(req.body.numberOfAdults) + parseInt(req.body.numberOfChildren);
    const room = await Room.get(req.body.roomTitle);
    if (numberOfGuests > room.capacity) {
      res.redirect(`/room/details/${req.body.roomTitle}`);
    }
    let days_between_dates = Math.ceil(
      (new Date(req.body.departureDate).getTime() -
        new Date(req.body.arrivalDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const reservationJSON = {
      roomTitle: req.body.roomTitle,
      guestEmail: req.session.user.email,
      arrivalDate: req.body.arrivalDate,
      departureDate: req.body.departureDate,
      numberOfAdults: req.body.numberOfAdults,
      numberOfChildren: req.body.numberOfChildren,
      price: room.startingPrice * days_between_dates,
    };
    const reservation = new Reservation(reservationJSON);
    await reservation.create();
    req.session.reservation = reservation.id;
    req.session.room = req.body.roomTitle;
    const options = await Option.getAll();
    for (let i = 0; i < options.length; i++) {
      if (req.body[`${i + 1}`] == "on")
        await reservation.addReservationOption(options[i]);
    }
    res.redirect("/user/payment");
  } else res.redirect(`/room/details/${req.body.roomTitle}`);
};

const modifyReservationOptions = async (req, res) => {
  const reservation = Reservation.get(req.body.id);
  const options = await Option.getAll();
  for (let i = 0; i < options.length; i++) {
    if (req.body[`${i + 1}`] == "on")
      await reservation.addReservationOption(options[i].id);
    else (await reservation).removeReservationOption(options[i].id);
  }
  res.redirect("/user");
};

const getUserReservations = async (req, res) => {
  if (req.session.user === undefined || req.session.user.role != "Guest")
    res.redirect("/user/login");
  const records = await Reservation.getGuestReservations(
    req.session.user.email
  );
  if (!records) return null;
  if (records.length > 10) records = records.slice(0, 10);
  return records;
};

const getUserReservationOptions = async (req, res) => {
  const reservation = await sessionedReservation(req, res);
  return await reservation.getReservationOptions();
};

const sessionedReservation = async (req, res) => {
  return await Reservation.get(req.session.reservation);
};

const getReservations = async (req, res) => {
  return await Reservation.getAll();
};
const cancelReservation = async (req, res) => {
  if (req.session.user === undefined || req.session.user.role != "Guest")
    res.redirect("/user/login");
  const guest = await Guest.get(req.session.user.email);
  await guest.cancelReservation(req.body.id);
};

const checkAvailability = async (req, res) => {
  const arrivalDate = new Date(req.body.arrivalDate);
  const departureDate = new Date(req.body.departureDate);
  const reservations = await Reservation.getRoomReservations(
    req.body.roomTitle
  );
  console.log(req.body);
  const room = await Room.get(req.body.roomTitle);
  if (room) {
    let count = 0;
    if (!reservations) return true;
    reservations.forEach((reservation) => {
      if (
        reservation.departureDate > arrivalDate &&
        reservation.arrivalDate < departureDate
      )
        count = count + 1;
    });
    if (count >= room.quantity) return false;
    else return true;
  }
  return false;
};

const confirmReservation = async (req, res) => {
  const reservation = await sessionedReservation(req, res);
  const guest = await Guest.get(req.session.user.email);
  guest.pay(reservation.id, req.body.method);
  res.redirect("/user");
};

const removeReservation = async (req, res) => {
  if (
    req.session.user != null &&
    (req.session.user.role == "Staff" || req.session.user.role == "Admin")
  ) {
    const staff = new Staff(await User.get(req.session.user.email));
    await staff.removeReservation(req.body.id);
    res.redirect("/admin");
  } else res.redirect("/user");
};

const getReservationsAndOptions = async (req, res) => {
  const reservations = await getReservations(req, res);
  if (reservations) {
    for (let i = 0; i < reservations.length; i++) {
      reservations[i].options = await reservations[i].getReservationOptions();
    }
    return reservations;
  }
  return [];
};

module.exports = {
  guest: {
    reserve,
    getUserReservations,
    cancelReservation,
    checkAvailability,
    modifyReservationOptions,
    getUserReservationOptions,
    sessionedReservation,
    confirmReservation,
  },
  staff: { getReservations, removeReservation, getReservationsAndOptions },
};
