const login = (req, res) => {
    res.render('login', {layout:false})
}
const signup = (req, res) => {
    res.render('signup',{layout:false})
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
    root:{basma,about,facilities,privacy},
    guest:{login,signup,bookings}
   
}