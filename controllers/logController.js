const express		= require('express')
const router		= express.Router()
const Log			= require('../models/log')
const User			= require('../models/user')

//user creates a log
router.post('/', async (req, res) => {
	try {
			console.log(req.body, 'this is req.body in log creation');
		const createdLog = await Log.create(req.body)
			console.log('this is createdLog in log creation');
			console.log(createdLog);
		const foundUser = await User.findById(req.session.userDataId)
			console.log('this is found user in log creation');
			console.log(foundUser);
		foundUser.log.push(createdLog)
		await foundUser.save()

		createdLog.user = foundUser
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








module.exports = router