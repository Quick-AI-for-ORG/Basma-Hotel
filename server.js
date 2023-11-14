const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const Guest = require("./Models/Guest");
const Room = require("./Models/Room");
const Reservation = require("./Models/Reservation");
const Question = require("./Models/Question");

const indexRouter = require("./Routes/index");
const guestRouter = require("./Routes/guest");
const roomRouter = require("./Routes/room");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "Your_Secret_Key", saveUninitialized: true , resave: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("Public"));
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Create MySQL Table
// Room.createTable();
// Guest.createTable();
// Reservation.createTable();
// Question.createTable();

//routers
app.use("/", indexRouter);
app.use("/guest", guestRouter);
app.use("/room", roomRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
