const axios = require("axios");
const REDIRECT_URI = "http://localhost:3000/guest/auth/facebook/callback"

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
    guest: {facebookLogin, facebookLoginCallback}
}