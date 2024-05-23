const queries = require('../queries/user_queries')

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

module.exports.getUsrByName = (req,res) => {
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
    const { username, pwd, playerId } = req.body;
    queries.addFavoritePlayer(username,pwd, playerId)
      .then((e) => {
          res.sendStatus(200); // Send a status code of 200 if successful
      })
      .catch((err) => {
          console.error('Error adding favorite player:', err);
          res.status(500).send(err.message); // Send a 500 status code if there is an error
      });
};

module.exports.addFavoriteTeam = (req, res) => {
    const { username, pwd, teamId } = req.body; // Assuming the request body contains these properties
    queries.addFavoriteTeam(username,pwd, teamId)
      .then(() => {
          res.sendStatus(200); // Send a status code of 200 if successful
      })
      .catch((err) => {
          console.error('Error adding favorite team:', err);
          res.status(500).send(err.message); // Send a 500 status code if there is an error
      });
};

