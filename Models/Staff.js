const User = require('./User')
class Staff extends User{
    constructor(firstName, lastName, email, password, phoneNumber, bio, address, role="Staff") {
        super(firstName, lastName, email, password, phoneNumber, bio, address, role)
    }
}
module.exports = Staff
