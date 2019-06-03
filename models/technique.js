const mongoose = require('mongoose')

const techniqueSchema = new mongoose.Schema({
	description: String,
	environment: {
		type: String,
		enum: ['outside', 'home', 'anywhere']
	}

})



module.exports = mongoose.model('Technique', techniqueSchema)