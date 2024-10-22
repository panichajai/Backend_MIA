const mongoose = require('mongoose');

const CarbrandSchema = new mongoose.Schema({
    brandEN: String,
    modelEN: String
})

const InstallmentSchema = new mongoose.Schema({
    statusTH: String,
    statusEN: String
})

const StatusInsuranceSettingSchema = new mongoose.Schema({
    statusTH: String,
    statusEN: String,
    code:String
})
module.exports = {
    StatusInsuranceSetting: mongoose.model('StatusInsuranceSetting', StatusInsuranceSettingSchema),
    Carbrand: mongoose.model('Carbrand', CarbrandSchema),
    Installment: mongoose.model('Installment', InstallmentSchema)
};