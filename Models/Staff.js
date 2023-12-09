const User = require('./User')
class Staff extends User{
    constructor(staffJSON) {
        super(staffJSON, "Staff")
    }
}
module.exports = Staff
