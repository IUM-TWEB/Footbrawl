const model = require('../models/user')

const getUsr = async (name, pwd) => {
    try {
        const user = await model.find({ user_name: name, pwd: pwd }, {}, null);
        console.log('Query result:', name, pwd); // Log per il debug
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const getUsrByName = (name) => {
    return model.find({user_name:name},{}, null)
}

const postUsr = (name, pwd) => {
    return model.create([{user_name: name, pwd: pwd}],{})
}

const addFavoritePlayer = (name, pwd , playerId) => {
    console.log("finqui ci siamo")
    return model.updateOne(
      { user_name: name , pwd:pwd},
      { $push: { favorite_players: playerId } }
    );
};

const addFavoriteTeam = (name, pwd, teamId) => {
    return model.updateOne(
      { user_name: name , pwd:pwd},
      { $push: { favorite_teams: teamId } }
    );
};

module.exports = { getUsr, postUsr, getUsrByName, addFavoritePlayer, addFavoriteTeam };
