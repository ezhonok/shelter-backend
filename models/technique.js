const mongoose = require('mongoose')

const techniqueSchema = new mongoose.Schema({
	home: String,
	outside: String,
	anywhere: String 

})



module.exports = mongoose.model('Technique', techniqueSchema)