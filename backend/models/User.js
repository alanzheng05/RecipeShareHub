const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    token: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);