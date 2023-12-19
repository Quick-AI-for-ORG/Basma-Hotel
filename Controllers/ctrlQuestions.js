const Question  = require('../Models/Question.js');
const  Guest  = require('../Models/Guest.js');


const askQuestion = async (req, res) => {
  const guest = await Guest.get(req.body.email);
    if(guest){
      let questionJSON = {
        message: req.body.message,
        email: req.body.email
      }
      await guest.askQuestion(questionJSON)
      res.redirect('/')
    }
    else res.redirect('/user')
}

const getQuestions = async (req, res) => {
   return await Question.getAll();
}


module.exports = { 
    guest: {askQuestion},
    staff: {getQuestions}
}
