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
    Question.findAll().then((questions) => {
        res.status(200).json({ questions });
    });
}

module.exports = { askQuestion, getQuestions }
