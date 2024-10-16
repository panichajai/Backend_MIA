const mongoose = require('mongoose');

const CarbrandSchema = new mongoose.Schema({
    brandEN: String,
    modelEN: String
})

module.exports = mongoose.model('Carbrand', CarbrandSchema)