const express		= require('express')
const router		= express.Router()
const Technique			= require('../models/technique')
const User			= require('../models/user')

//user creates a technique
router.post('/', async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.userDataId)
		console.log('this is found user in create technique');
		console.log(foundUser); 

		const createdTechnique = await Technique.create(req.body)
		console.log('this is createdTechnique in create technique');
		console.log(createdTechnique);

		
		foundUser.technique.push(createdTechnique)
		await foundUser.save()

		createdTechnique.user = foundUser
		console.log('This is the user who created the technique');
		console.log(foundUser);
		await createdTechnique.save()
		res.json({
			status: 200,
			data: createdTechnique
		})
	} catch(err){
		console.log(err);
		res.send(err)
	}
})








module.exports = router