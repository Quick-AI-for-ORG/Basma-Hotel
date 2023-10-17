const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const expressLayouts= require("express-ejs-layouts")
const indexRouter= require("./Routes/index")
const guestRouter = require("./Routes/guest")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "Your_Secret_Key", saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("Public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");


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
app.use('/',indexRouter)
app.use('/guest',guestRouter)
