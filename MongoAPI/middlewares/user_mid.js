const queries = require('../queries/user_queries')
const {mongo} = require("mongoose");

module.exports.getUsr = (req, res) => {
  queries.getUsr(req.body.username, req.body.pwd)
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      console.log(err)
      res.send(err.name)
    })
}

module.exports.getUsrByName = (req, res) => {
  queries.getUsrByName(req.body.username, req.body.pwd)
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      console.log(err)
      res.send(err.name)
    })
}

module.exports.postUsr = (req, res) => {
  queries.postUsr(req.body.username, req.body.pwd)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err)
      res.send(err.name)
    })
}

module.exports.addFavoritePlayer = (req, res) => {

  const {username, pwd, playerId} = req.body;
  queries.addFavoritePlayer(username, pwd, playerId)
    .then((e) => {
      console.log(e)
      res.sendStatus(200); // Send a status code of 200 if successful
    })
    .catch((err) => {
      console.error('Error adding favorite player:', err);
      res.status(500).send(err.message); // Send a 500 status code if there is an error
    });
};

module.exports.getFavoritePlayer = (req, res) => {
  const {username, pwd} = req.body
  queries.getFavoritePlayer(username, pwd)
    .then(resp => {
      res.send(resp.favorite_players)

    })
    .catch(e => {
      res.send(e.name)
    })
}

module.exports.addFavoriteTeam = (req, res) => {
  const {username, pwd, teamId} = req.body; // Assuming the request body contains these properties
  queries.addFavoriteTeam(username, pwd, teamId)
    .then(() => {
      res.sendStatus(200); // Send a status code of 200 if successful
    })
    .catch((err) => {
      console.error('Error adding favorite team:', err);
      res.status(500).send(err.message); // Send a 500 status code if there is an error
    });
};

module.exports.addFormation = (req, res) => {
  const {username, pwd, formation} = req.body
  queries.addFormation(username, pwd, formation)
    .then(() => {
      res.sendStatus(200); // Send a status code of 200 if successful
    })
    .catch((err) => {
      console.error('Error adding formations:', err);
      res.status(500).send(err.message); // Send a 500 status code if there is an error
    });
}

module.exports.getFormation = (req, res) => {
  const {username, pwd} = req.body
  queries.getFormation(username, pwd)
    .then((resp) => {
      res.send(resp.formations);
    })
    .catch((err) => {
      console.error('Error getting saved formations:', err);
      res.status(500).send(err.message); // Send a 500 status code if there is an error
    });
}


module.exports.removePlayer = async (req, res) => {
  const {username, pwd, playerId} = req.body
  console.log(username,pwd,playerId)


  if (!(username && pwd && playerId)) {
    res.json({
      success: false,
      status: 500,
      message: "Bad request",
      data: null
    })
  }

  try {
    const mongo_resp = (await queries.removeFavoritePlayer(username,pwd,playerId))
    console.log(mongo_resp)
    if (mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
      res.json({
        success: false,
        status: 404,
        message: "No resource found",
        data: null
      })
    } else {
      res.json({
        success: true,
        status: 200,
        message: "",
        data: mongo_resp
      })
    }
  } catch (e) {
    res.json({
      success: false,
      status: 500,
      message: "internal server error",
      data: null
    })
  }
}

module.exports.removeTeam = async (req, res) => {
  const {username, pwd, teamId} = req.body
  console.log("siamo effettivamente qui ",req.body)

  if (!(username && pwd && teamId)) {
    res.json({
      success: false,
      status: 500,
      message: "Bad request",
      data: null
    })
  }

  try {
    const mongo_resp = (await queries.removeFavoriteTeam(username, pwd, teamId))
    console.log("eccoci ",mongo_resp)
    if (mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
      res.json({
        success: false,
        status: 404,
        message: "No resource found",
        data: null
      })
    } else {
      res.json({
        success: true,
        status: 200,
        message: "",
        data: mongo_resp
      })
    }
  } catch (e) {
    res.json({
      success: false,
      status: 500,
      message: "internal server error",
      data: null
    })
  }
}


