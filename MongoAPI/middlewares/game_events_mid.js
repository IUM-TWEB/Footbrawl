const queries = require('../queries/game_events_queries')

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

const getByPlayer = async (req, res) => {
  try {
    console.log(req.params)

    const mongo_resp = (await queries.getByPlayer(req.params.player_id))
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

const getByClub = async (req, res) => {
  try {
    const mongo_resp = (await queries.getByClub(req.params.club_id))
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

const getGoalDatesById = async (req, res) => {
  try {
    const mongo_resp = (await queries.getGoalDatesByPlayerIn(req.params.player_id))
    console.log("RISaa\n\n",mongo_resp)
    if (mongo_resp === []) {
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

const getAssistDatesByPlayerId = async (req, res) => {
  try {
    const mongo_resp = (await queries.getAssistDatesByPlayerIn(req.params.player_id))
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

const getTopScorer = async (req, res) => {
  try {
    const mongo_resp = (await queries.getTopScorer(req.params.competition_id))
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

module.exports = {getById, getByPlayer, getByClub, getAssistDatesByPlayerId, getGoalDatesById, getTopScorer}
