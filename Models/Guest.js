const User = require('./User')
class Guest extends User{
  constructor(firstName, lastName, email, password, phoneNumber, bio, address, role="Guest") {
    super(firstName, lastName, email, password, phoneNumber, bio, address, role)
  }
  async register(){

  }
  async reserve(){

  }
  async cancelReservation(){

  }
  async getReservations(){

  }
  async pay(){

  }
  async modify(){

  }

}

module.exports = Guest






