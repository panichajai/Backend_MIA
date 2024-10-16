const mongoose = require('mongoose');

const InstallmentSchema = new mongoose.Schema({
    statusTH: String,
    statusEN: String
})

module.exports = mongoose.model('Installment', InstallmentSchema)