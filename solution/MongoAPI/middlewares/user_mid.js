const queries = require('../queries/user_queries')

module.exports.getUsr = async (req, res) => {
  const {username, pwd} = req.body
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getUsr(username, pwd))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0) {
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
  const {username, pwd} = req.body
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getUsrByName(username, pwd))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
  const {username, pwd} = req.body
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.postUsr(username, pwd))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
  const {username, pwd, playerId} = req.body
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.addFavoritePlayer(username, pwd, playerId))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
          data: mongo_resp.success
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
  const {username, pwd} = req.params
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getFavoritePlayer(username, pwd))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
  const {username, pwd, teamId} = req.body
  if (!(username && pwd && teamId)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.addFavoriteTeam(username, pwd, teamId))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
  const {username, pwd, formation} = req.body
  if (!(username && pwd && formation)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.addFormation(username, pwd, formation))
      console.log(mongo_resp)
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
  const {username, pwd} = req.body
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getFormation(username, pwd))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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
  const {username, pwd} = req.body
  if (!(username && pwd)) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getFormation(username, pwd))

      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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


module.exports.removePlayer = async (req, res) => {

  const {username, pwd, playerId} = req.body


  if (!(username && pwd && playerId)) {
    res.json({
      success: false,
      status: 500,
      message: "Bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.removeFavoritePlayer(username, pwd, playerId))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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

  if (!(username && pwd && teamId)) {
    res.json({
      success: false,
      status: 500,
      message: "Bad request",
      data: null
    })
  } else

    try {
      const mongo_resp = (await queries.removeFavoriteTeam(username, pwd, teamId))
      if (!mongo_resp || mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp === []) {
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


