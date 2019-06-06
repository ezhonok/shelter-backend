const express 		= require('express')
const app 			= express()
const bodyParser 	= require('body-parser')
const session 		= require('express-session')
const cors 			= require('cors')


require ('dotenv').config()

require ('./db/db')

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const corsOptions = {
	origin: process.env.FRONT_END_URL,
	credentials: true,
	optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const authController = require('./controllers/authController')
const logController = require('./controllers/logController')
const techniqueController = require('./controllers/techniqueController')

app.use('/auth', authController)
app.use('/log', logController)
app.use('/technique', techniqueController)




app.listen(process.env.PORT || 9000, () => {
	console.log('rabotaem na port ' + process.env.PORT);
})
