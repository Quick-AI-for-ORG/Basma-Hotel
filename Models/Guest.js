const { userModel } = require('./DBsequelize')
const User = require('./User')
class Guest extends User{
  constructor(guestJSON) {
    super(guestJSON,"Guest")
  }
  
  async reserve(){

  }
  async cancelReservation(){

  }
  async getReservations(){

  }
  async pay(){

  }

}

module.exports = Guest






