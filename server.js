const express 		= require('express')
const app 			= express()
const bodyParser 	= require('body-parser')


require ('dotenv').config()

require ('./db/db')



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const authController = require('./controllers/authController')


app.use('/auth', authController)

app.listen(process.env.PORT || 9000, () => {
	console.log('rabotaem na port ' + process.env.PORT);
})
