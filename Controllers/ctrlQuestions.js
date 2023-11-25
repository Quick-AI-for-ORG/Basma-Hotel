const { Question } = require('../Models/Question.js');
const { Guest } = require('../Models/Guest.js');


const askQuestion = async (req, res) => {
Guest.findOne({where: {email: req.body.email}}).then(async (user) => {
    if(user){
Question.create({
    message: req.body.message,
    email: req.body.email,
}).then((question) => {
    console.log(question)
    res.redirect('/')
})}
else res.redirect('/guest')
})}

const getQuestions = async (req, res) => {
   return await Question.findAll();
}

const removeQuestions = async (req, res) => {
    try { await Question.destroy({
        where: {
          id: req.body.id
        }
      }).then((question) =>{
        res.status(201).json({ message: "Question removed successfully" });
      })
    }
      catch(err) {
        console.error("Error: " + err);
        res.status(400).json({ message: err.message });
      }
    }

module.exports = { 
    guest: {askQuestion},
    admin: {getQuestions, removeQuestions}
}
