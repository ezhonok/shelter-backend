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
	userData.password = passwordHash
	userData.img = req.body.img
	userData.preferredname = req.body.preferredname
	userData.accomplishment = req.body.accomplishment
	userData.favoritePerson = req.body.favoritePerson
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

//For when user info is needed
router.get('/user-data', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId)
		allUserData = foundUser
		res.json({
			status: 200,
			data: allUserData
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
		console.log(foundUser.password, 'This is foundUser password in login');
		console.log(req.body.password, "this is req.body passowrd in login");
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


//logout

router.get('/logout', async (req, res, next) => {
	try {
		req.session.destroy()
		console.log(req.session, ' This is req.session in logout');
		res.json({
			status: 200,
			data: 'logout successful'
		})
	} catch(err) {
		next(err)
	}
})





module.exports = router