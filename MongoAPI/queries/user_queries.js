const model = require('../models/user')

const getUsr = async (name, pwd) => {
  try {
    const user = await model.find({user_name: name, pwd: pwd}, {}, null);
    console.log('Query result:', name, pwd); // Log per il debug
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const getUsrByName = (name) => {

  return model.find({user_name: name}, {}, null)
}

const postUsr = (name, pwd) => {
  return model.create([{user_name: name, pwd: pwd}], {})
}

const addFavoritePlayer = async (name, pwd, playerId) => {
  try {
    const rr = await getUsr(name, pwd)
    const result = await model.updateOne(
      {user_name: name, pwd: pwd},
      {$push: {favorite_players: playerId}}
    );

    if (result.nModified === 0) {
      console.log("non trovato")
    }

    return {success: true, message: "Player added to favorites successfully."};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

const removeFavoritePlayer = (name, pwd, playerId) => {
  return model.updateOne(
    {user_name: name, pwd: pwd},
    {$pull: {favorite_players: playerId}}
  );
};

const getFavoritePlayer = async (username, pwd) => {
  try {
    return await model.findOne({user_name: username, pwd: pwd}, {}, null)
  } catch (e) {

  }
}
const addFavoriteTeam = (name, pwd, teamId) => {
  return model.updateOne(
    {user_name: name, pwd: pwd},
    {$push: {favorite_teams: teamId}}
  );
};

const removeFavoriteTeam = (name, pwd, teamId) => {
  return model.updateOne(
    {user_name: name, pwd: pwd},
    {$pull: {favorite_teams: teamId}}
  );
};

const getFavoriteTeam = async (username, pwd) => {
  try {
    return result = await model.findOne({user_name: username, pwd: pwd}, {}, null)
  } catch (e) {
    return null
  }
}

const addFormation = async (username, pwd, formation) => {
  try {
    const updateResult = await model.updateOne(
      {user_name: username, pwd: pwd, "formations.type": formation.type},
      {$set: {"formations.$": formation}}
    );

    if (updateResult.matchedCount === 0) {
      // Se l'oggetto non è stato trovato, aggiungilo
      const pushResult = await model.updateOne(
        {user_name: username, pwd: pwd},
        {$push: {formations: formation}}
      );
      console.log("Formation added successfully!", pushResult);
    } else {
      console.log("Formation updated successfully!", updateResult);
    }
  } catch (error) {
    console.error("Error updating or adding formation:", error);
  }
}

const getFormation = (username, pwd) => {
  return model.findOne({user_name: username, pwd: pwd}, {}, null)
}

module.exports = {
  getUsr,
  postUsr,
  getUsrByName,
  addFavoritePlayer,
  addFavoriteTeam,
  getFavoriteTeam,
  getFavoritePlayer,
  addFormation,
  getFormation,
  removeFavoriteTeam,
  removeFavoritePlayer,
};
