const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: String,
    pwd: String,
    favorite_players: [Number], // Array of strings for player IDs
    favorite_teams: [String],    // Array of strings for team IDs
    formations: [Object]
});

module.exports = mongoose.model('User', userSchema);