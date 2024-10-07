const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_email: String,
    user_password: String,
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)