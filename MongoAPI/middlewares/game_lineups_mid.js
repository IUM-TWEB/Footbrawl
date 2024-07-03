const queries = require('../queries/game_lineups_queries')

const getById = async (req, res) => {
  try {
    const mongo_resp = (await queries.getById(req.params.id))
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

const getByPlayer = async (req,res)=>{
  try {
    const mongo_resp = (await queries.getByPlayer(req.params.player))
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

const getByClub = async (req,res) => {
  try {
    const mongo_resp = (await  queries.getByClub(req.params.club))
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

const getByPlayerAndPosition = async (req,res) => {
  try {
    const mongo_resp = (await  queries.getByPlayerAndPosition(req.params.player, req.params.pos))
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

module.exports = {getById, getByPlayer, getByClub, getByPlayerAndPosition}