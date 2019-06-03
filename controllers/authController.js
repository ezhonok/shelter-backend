const express		= require('express')
const router		= express.Router()
const User			= require('../models/user')
const bcrypt		= require('bcryptjs')


//registration
router.post('/register', async (req, res, next) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	console.log(passwordHash, ' This is hashed password');
	const userData = {}
	userData.username = req.body.username
	userData.password = req.body.password
	userData.img = req.body.img
	userData.preferredname = req.body.preferredname
	userData.accomplishment = req.body.accomplishment
	userData.favoriteperson = req.body.favoritePerson
	console.log(userData, ' this is userData in registration route');

	try {
		const createdUser = await User.create(userData)
		req.session.logged = true
		req.session.userDataId = createdUser._id
		req.session.username = req.body.username
		console.log('registered successfully');
		res.json({
			status: 200,
			data: 'registration successful',
			userId: createdUser._id
		})

	} catch(err){
		next(err)
	}
})

//login

router.post('/login', async (req, res, next) => {
	try{
		const foundUser = await User.findOne({'username': req.body.username})
		console.log(foundUser, 'This is foundUser in login route');
		if(foundUser) {
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
				req.session.logged = true
				req.session.userDataId = foundUser._id
				console.log('logged in successfully');

				res.json({
					status: 200,
					data: 'login successful'
				})
			}
		}
	} catch(err) {
		next(err)
	}
})








module.exports = router