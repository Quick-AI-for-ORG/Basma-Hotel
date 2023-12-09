const Staff = require('./Staff')
class Admin extends Staff{
  constructor(adminJSON) {
    super(adminJSON, "Admin")
}
    async add(user){
     await Admin.crudInterface.create(user,userModel,"email") 
   }
 }
 module.exports = Admin