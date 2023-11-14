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

module.exports = { 
    guest: {askQuestion},
    admin: {getQuestions}
}
