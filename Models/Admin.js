const Staff = require('./Staff')
class Admin extends Staff{
    async add(user){
     await this.crudInterface.create(user,userModel,"email") 
   }
 }
 module.exports = Admin