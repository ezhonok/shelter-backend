const express		= require('express')
const router		= express.Router()
const Log			= require('../models/log')
const User			= require('../models/user')

//user creates a log
router.post('/', async (req, res) => {
	try {
		console.log('req.sesh.userDataId in create log');
		console.log(req.session.userDataId);

		const foundUser = await User.findById(req.session.userDataId)
		console.log('this is found user in log creation');
		console.log(foundUser); 

		const createdLog = await Log.create(req.body)
		console.log('this is createdLog in log creation');
		console.log(createdLog);

		
		foundUser.log.push(createdLog)
		await foundUser.save()

		createdLog.user = foundUser
		console.log('This is the user who created the log');
		console.log(foundUser);
		await createdLog.save()
		res.json({
			status: 200,
			data: createdLog
		})
	} catch(err){
		console.log(err);
		res.send(err)
	}
})


//user can see all their logs

router.get('/all-logs', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('log')
		console.log("FOUND USER logs in get route for all their logs");
		console.log(foundUser);
		allUserLogs = foundUser.log
		res.json({
			status: 200,
			data: allUserLogs
		})
	} catch(err){
		next(err)
	}
})

//user can see their good-person specific logs on "Reflect and Analyze", "Feel Better"
router.get('/good-person', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('log')
		console.log("HERE IS THE FOUND USER, good-person route:");
		console.log(foundUser);
		console.log("all the logs:")
		console.log(allLogs)

		const goodPeople = foundUser.log.map(log => {
			return log.goodPerson 
		})

		res.json({
			status: 200,
			data: goodPeople
		})
	} catch(err){
		next(err)
	}
})


//user can see their good-situation logs
router.get('/good-situation', async (req, res, next) => {
	try {
		const allLogs = await Log.find()
		const foundUser = await User.findById(req.session.userDataId).populate('log')
		console.log("HERE IS THE FOUND USER, good-ACTIVITY route:");
		console.log(foundUser);

		const goodActivities = foundUser.log.map(log => {
			return log.goodActivity 
		})

		res.json({
			status: 200,
			data: goodActivities
		})
	} catch(err){
		next(err)
	}
})


//user can see their bad people logs

router.get('/bad-situation', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('log')
		console.log("HERE IS THE FOUND USER, bad-situation route:");
		console.log(foundUser);

		const badSituations = foundUser.log.map(log => {
			return log.badSituation
		})

		res.json({
			status: 200,
			data: badSituations
		})
	} catch(err){
		next(err)
	}
})


//user can see their bad people logs

router.get('/bad-person', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('log')
		console.log("HERE IS THE FOUND USER, bad people route:");
		console.log(foundUser);

		const badPeople = foundUser.log.map(log => {
			return log.badPerson
		})

		res.json({
			status: 200,
			data: badPeople
		})
	} catch(err){
		next(err)
	}
})




module.exports = router