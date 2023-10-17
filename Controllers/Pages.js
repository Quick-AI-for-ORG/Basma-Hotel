const login = (req, res) => {
    res.render('login')
}
const signup = (req, res) => {
    res.render('signup')
}
const bookings = (req, res) => {
    res.render('myBookings')
}
const basma = (req, res) =>{
    res.render('basma')
}
const about = (req, res) =>{
    res.render('aboutUs')
}
const facilities = (req,res) =>{
    res.render('facilities')
}
const privacy = (req,res) =>{
    res.render('privacyPolicy')
}
module.exports = {
    guest:{login,signup,bookings},
    basma:{basma,about,facilities,privacy}
}