const User  = require('../Models/User.js')

const getAll = async (req, res) => {
    return await User.getAll();
  };

  module.exports = {
    staff: {
        getAll
    },
    admin: {}
  }