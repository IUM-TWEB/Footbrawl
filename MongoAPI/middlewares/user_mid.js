const queries = require('../queries/user_queries')
const model = require("../models/user");

module.exports.getUsr = async (req, res) => {
  try {
    const mongo_resp = (await queries.getUsr(req.body.username, req.body.pwd))
    if (mongo_resp === '') {
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

module.exports.getUsrByName = async (req, res) => {
  try {
    const mongo_resp = (await queries.getUsrByName(req.body.username, req.body.pwd))
    if (mongo_resp === '') {
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

module.exports.postUsr = async (req, res) => {
  try {
    const mongo_resp = (await queries.postUsr(req.body.username, req.body.pwd))
    if (mongo_resp === '') {
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

module.exports.addFavoritePlayer = async (req, res) => {
  try {
    const mongo_resp = (await queries.addFavoritePlayer(req.body.username, req.body.pwd, req.body.playerId))
    if (mongo_resp === '') {
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
};

module.exports.getFavoritePlayer = async (req, res) => {
  try {
    const mongo_resp = (await queries.getFavoritePlayer(req.body.username, req.body.pwd))
    if (mongo_resp === '') {
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

module.exports.addFavoriteTeam = async (req, res) => {
  try {
    const mongo_resp = (await queries.addFavoriteTeam(req.body.username, req.body.pwd, req.body.teamId))
    if (mongo_resp === '') {
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
};

module.exports.addFormation = async (req, res) => {
  try {
    const mongo_resp = (await queries.addFormation(req.body.username, req.body.pwd, req.body.formation))
    if (mongo_resp === '') {
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

module.exports.getFormation = async (req, res) => {
  try {
    const mongo_resp = (await queries.getFormation(req.body.username, req.body.pwd))
    if (mongo_resp === '') {
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

module.exports.getAllFav = async (req, res) => {
  try {
    const mongo_resp = await model.findOne(
      {user_name: req.body.username, pwd: req.body.pwd}, {}, null
    );
    if (mongo_resp === '') {
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
        data: {
          "favorite_players": mongo_resp.favorite_players,
          "favorite_teams": mongo_resp.favorite_teams,
          "formations": mongo_resp.formations
        }
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

