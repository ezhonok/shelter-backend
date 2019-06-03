const express 		= require('express')
const app 			= express()
const bodyParser 	= require('body-parser')
const session 		= require('express-session')

require ('dotenv').config()

require ('./db/db')

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const authController = require('./controllers/authController')
const logController = require('./controllers/logController')

app.use('/auth', authController)
app.use('/log', logController)




app.listen(process.env.PORT || 9000, () => {
	console.log('rabotaem na port ' + process.env.PORT);
})
