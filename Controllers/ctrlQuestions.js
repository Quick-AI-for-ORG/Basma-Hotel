const { Question } = require('../Models/Question.js');


const ask = async (req, res) => {
Question.create({
    message: req.body.message,
    email: req.body.email,
}).then((question) => {
    res.status(201).json({ message: "Question added" });
    res.redirect('/')
})}

const getQuestions = async (req, res) => {
    Question.findAll().then((questions) => {
        res.status(200).json({ questions });
    });
}

module.exports = { ask, getQuestions }
