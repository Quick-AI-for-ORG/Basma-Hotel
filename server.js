const express= require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'Your_Secret_Key', saveUninitialized: true }))
app.use(express.urlencoded({extended:true}))
app.use(express.json())    
app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.use(express.static('Public'));
app.listen(3000)