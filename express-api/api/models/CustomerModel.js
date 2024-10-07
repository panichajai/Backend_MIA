const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customer_title: String,
    customer_fname: String,
    customer_lname: String,
    customer_dateOfBirth: Date,
    customer_gender: String,
    customer_idCard: String,
    customer_issuedDate: Date,
    customer_expireDate: Date,
    customer_phone: String,


    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Customer', CustomerSchema)