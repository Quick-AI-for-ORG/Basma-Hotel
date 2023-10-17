const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "Your_Secret_Key", saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("Public"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

const mysql = require("mysql");

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
