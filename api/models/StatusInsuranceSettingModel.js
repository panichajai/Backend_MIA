const mongoose = require('mongoose');

const StatusInsuranceSettingSchema = new mongoose.Schema({
    statusTH: String,
    statusEN: String,
    code:String
})

module.exports = mongoose.model('StatusInsuranceSetting', StatusInsuranceSettingSchema)