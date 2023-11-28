const bcrypt = require("bcrypt"); // for password hashing
const { Guest } = require("../Models/Guest.js");
const { guest } = require("./Pages.js");
const { where } = require("sequelize");
const axios = require("axios");

const REDIRECT_URI = "http://localhost:3000/guest/auth/facebook/callback";

const register = async (req, res) => {
  //check if user is already registered
  Guest.findOne({ where: { email: req.body.email } }).then(async (user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
  });
  let hashed = await bcrypt.hash(req.body.password, 12);
  let user = Guest.create({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: hashed,
    address: req.body.address,
    twitterLink: "",
    facebookLink: "",
    instagramLink: "",
    googleLink: "",
    bio: "",
    role: "Guest",
  }).then((user) => {
    req.session.user = user;

    res.redirect("/guest");
  });

  //create
  //save
};

const login = async (req, res) => {
  const guestRecord = await Guest.findOne({
    where: {
      email: req.body.email,
    },
  });

  // If the guest record does not exist, return an error
  if (!guestRecord) {
    let err = new Error("Email not found");
    res.status(400).json({ message: err.message });
  } else {
    const isMatch = await bcrypt.compare(
      req.body.password,
      guestRecord.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    } else {
      req.session.user = guestRecord;
      res.redirect("/guest");
    }
  }
};

const deleteGuest = async (req, res) => {
  try {
    await Guest.destroy({
      where: {
        email: req.session.user.email,
      },
    });
  } catch (err) {
    console.error("Error: " + err);
    res.status(400).json({ message: err.message });
  }
  req.session.destroy();
  res.redirect("/");
};

const updateGuest = async (req, res) => {
  console.log(req.body);
  try {
    await Guest.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        // password: req.body.password,
        address: req.body.address,
      },
      {
        where: {
          email: req.session.user.email,
        },
      }
    );
  } catch (err) {
    console.error("Error: " + err);
    res.status(400).json({ message: err.message });
  }
  req.session.user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    address: req.body.address,
    twitterLink: "",
    facebookLink: "",
    instagramLink: "",
    googleLink: "",
    bio: "",
    role: "Guest",
  };
  res.redirect("/guest");
};

const updateBio = async (req, res) => {
  console.log(req.body);
  try {
    await Guest.update(
      {
        bio: req.body.bio,
      },
      {
        where: {
          email: req.session.user.email,
        },
      }
    );
  } catch (err) {
    console.error("Error: " + err);
    res.status(400).json({ message: err.message });
  }
  req.session.user = {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    email: req.session.user.email,
    phoneNumber: req.session.user.phoneNumber,
    password: req.session.user.password,
    address: req.session.user.address,
    twitterLink: req.session.user.twitterLink,
    facebookLink: req.session.user.facebookLink,
    instagramLink: req.session.user.instagramLink,
    googleLink: req.session.user.googleLink,
    bio: req.body.bio,
    role: req.session.user.role,
  };
  res.redirect("/guest");
};
const checkMail = async (req, res) => {
  Guest.findOne({ where: { email: req.body.mail } }).then(async (result) => {
    console.log(result);
    if (result != null) res.send({ result: "found" });
    else res.send({ result: "not found" });
  });
};

const checkLogin = async (req, res) => {
  await Guest.findOne({ where: { email: req.body.mail } }).then(
    async (guest) => {
      console.log("the guest is" + guest);
      if (guest == null) res.send({ result: "not found" });
      else {
        const isMatch = await bcrypt.compare(req.body.password, guest.password);
        if (!isMatch) {
          return res.send({ result: "not found" });
        } else {
          res.send({ result: "found" });
        }
      }
    }
  );
};
const retriveGuests = async (req, res) => {
  return await Guest.findAll();
};

const facebookLogin = async (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.clientId}&redirect_uri=${REDIRECT_URI}&scope=email`;
  res.redirect(url);
};

const facebookLoginCallback = async (req, res) => {
    const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}&code=${code}&redirect_uri=${REDIRECT_URI}`);

    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

    // Code to handle user authentication and retrieval using the profile data

    console.log(profile);
    
    const guestEmail = profile.email;

    Guest.findOne({ where: { email: guestEmail } }).then((guest) => {
      if (!guest) {
        const fname = profile.name.split(" ")[0];
        const lname = profile.name.split(" ")[1];
        Guest.create({
          firstName: fname,
          lastName: lname,
          email: profile.email,
          phoneNumber: "",
          password: "",
          address: "",
          twitterLink: "",
          facebookLink: "",
          instagramLink: "",
          googleLink: "",
          bio: "",
          role: "Guest",
        }).then((guest) => {
          req.session.guest = guest;
          res.redirect("/guest");
        });
      } else {
        console.log(guest.email);
        console.log("KILL")
        req.session.user = guest;
        res.redirect("/guest");
      }
    });


  } catch (error) {
    console.error('Error:', error.response.data.error);
    res.redirect('/guest/login');
  }
}

module.exports = {
  public: { register, login, checkMail, checkLogin, facebookLogin, facebookLoginCallback },
  guest: { updateGuest, updateBio },
  admin: { retriveGuests, deleteGuest },
};
