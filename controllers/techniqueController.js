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


//user can see everyone's techniques
router.get('/all-techniques', async (req, res, next) => {
	try {
		const allTechniques = await Technique.find()

		res.json({
			status: 200,
			data: allTechniques
		})
	} catch(err){
		next(err)
	}
})

//user can see their own techniques
router.get('/user-techniques', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('technique')
		allUserTechniques = foundUser.technique
		res.json({
			status: 200,
			data: allUserTechniques
		})
	} catch(err){
		next(err)
	}
})


//user can see their own home techniques
router.get('/user-techniques-home', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('technique')
		console.log("Here is the found user in home techniques");
		console.log(foundUser);
		
		const allHomeTechniques = []
		const homeTechniques = foundUser.technique.map(technique => {

		if (technique.environment === 'home') {
			const foundTechnique = technique.description
			allHomeTechniques.push(foundTechnique)
			console.log("Found home technique", foundTechnique);
		}
		})
		res.json({
			status: 200,
			data: allHomeTechniques
		})
	} catch(err){
		next(err)
	}
})


//user can see their own outside techniques
router.get('/user-techniques-outside', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('technique')
		
		const allOutsideTechniques = []
		const outsideTechniques = foundUser.technique.map(technique => {

		if (technique.environment === 'outside') {
			const foundTechnique = technique.description
			allOutsideTechniques.push(foundTechnique)
			console.log("Found outside technique", foundTechnique);
			// allHomeTechniques.push(foundTechnique)
		}
		})
		res.json({
			status: 200,
			data: allOutsideTechniques
		})
	} catch(err){
		next(err)
	}
})


//user can see their own anywhere techniques
router.get('/user-techniques-anywhere', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userDataId).populate('technique')
		
		const allAnywhereTechniques = []
		const anywhereTechniques = foundUser.technique.map(technique => {

		if (technique.environment === 'anywhere') {
			const foundTechnique = technique.description
			allAnywhereTechniques.push(foundTechnique)
			console.log("Found anywhere technique --->", foundTechnique);
			// allHomeTechniques.push(foundTechnique)
		}
		})
		res.json({
			status: 200,
			data: allAnywhereTechniques
		})
	} catch(err){
		next(err)
	}
})


//user can update their techniques
router.put('/:id', async (req, res) => {
	try {
	console.log('hitting the put route');
	const updatedTechnique = await Technique.findByIdAndUpdate(req.params.id, req.body, {new: true})
	res.json({
		status: 200,
		data: updatedTechnique
	})
	} catch(err) {
		res.send(err)
	}
})





module.exports = router