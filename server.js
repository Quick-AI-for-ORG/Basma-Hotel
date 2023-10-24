const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./Routes/index");
const guestRouter = require("./Routes/guest");
const roomRouter = require("./Routes/room");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "Your_Secret_Key", saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("Public"));
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SWEProject",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

//routers
app.use("/", indexRouter);
app.use("/guest", guestRouter);
app.use("/room", roomRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    Title VARCHAR(255) PRIMARY KEY,
    quantity int NOT NULL,
    startingPrice DECIMAL(10, 2) NOT NULL,
    characteristics JSON NOT NULL,
    capacity INT NOT NULL,
    description TEXT NOT NULL,
    executive TINYINT(1) NOT NULL,
    imageURL VARCHAR(255) NOT NULL
  );
`;
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS guests (
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    cardNumber VARCHAR(20) NOT NULL DEFAULT '0000 0000 0000 0000',
    expirationDate VARCHAR(10) NOT NULL DEFAULT '01/25',
    cvv VARCHAR(5) NOT NULL DEFAULT '000',
    role VARCHAR(10) NOT NULL DEFAULT 'Guest',
    bio VARCHAR(255) NOT NULL DEFAULT 'No bio yet',
    address VARCHAR(255) NOT NULL DEFAULT 'No address yet',
    instagramLink VARCHAR(255),
    facebookLink VARCHAR(255),
    twitterLink VARCHAR(255),
    googleLink VARCHAR(255)
  );
`;

connection.query(createTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});

module.exports = connection;

connection.query(createRoomTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});

const createReservationTableQuery = `
  CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_Title VARCHAR(255) NOT NULL,
    guest_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    number_of_people INT NOT NULL,
    special_request TEXT
    FOREIGN KEY (guest_id) REFERENCES guests (id) 
    FOREIGN KEY (room_Title) REFERENCES rooms (Title) 
  );
`;

connection.query(createReservationTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});

const createQTableQuery = `
  CREATE TABLE IF NOT EXISTS questions (
    email varchar(255) NOT NULL,
    message varchar(255) NOT NULL
  );
`;

connection.query(createQTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
