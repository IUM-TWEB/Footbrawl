const mongoose = require('mongoose')
const user = new mongoose.Schema({
    user_name: String,
    pwd:String,
})

module.exports = mongoose.model('user', user)