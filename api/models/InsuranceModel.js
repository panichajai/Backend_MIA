const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
    installmentConfirmDate: String,
    insuranceCustomer: String,
    policyHolder: String,
    phoneNumber: String,
    IDCard: String,
    carBrand: String,
    carModel: String,
    carLicensePlate: String,
    province: String,
    carChassisNumber: String,
    policyType: String,
    coverage: String,
    premium: String,
    installmentDesire: String,
    installment: String,
    
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Insurance', InsuranceSchema)