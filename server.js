const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./Models/DBsequelize");
const indexRouter = require("./Routes/index");
const userRouter = require("./Routes/user");
const roomRouter = require("./Routes/room");
const adminRouter = require("./Routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "Your_Secret_Key", saveUninitialized: true , resave: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("Public"));
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


// sequelize.createTables()

//routers
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
app.use((req, res) => {
  res.status(404).render("notfound",{layout: false});
});
