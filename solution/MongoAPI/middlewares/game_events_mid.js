const queries = require('../queries/game_events_queries')
const {mongo} = require("mongoose");

const getById = async (req, res) => {
  const {id} = req.params
  if (!id) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getById(id))
      if (!mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0 || !mongo_resp) {
        res.json({
          success: false,
          status: 404,
          message: "No resource found",
          data: null
        })
      } else {
        req.params.res.json({
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
  const {player_id} = req.params
  if (!player_id) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getByPlayer(player_id))
      if (!mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0 || !mongo_resp) {
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
  const {club_id} = req.params
  if (!club_id) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getByClub(club_id))
      if (!mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0 || !mongo_resp) {
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
  const {player_id} = req.params
  if (!player_id) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getGoalDatesByPlayerIn(player_id))
      if (!mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0 || !mongo_resp) {
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
  const {player_id} = req.params
  if (!player_id) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else {
    try {
      const mongo_resp = (await queries.getAssistDatesByPlayerIn(player_id))
      if (!mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0 || !mongo_resp) {
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
}

const getTopScorer = async (req, res) => {
  const {competition_id} = req.params
  if (!competition_id) {
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  } else
    try {
      const mongo_resp = (await queries.getTopScorer(competition_id))
      if (!mongo_resp === '' || Array.isArray(mongo_resp) && mongo_resp.length === 0 || !mongo_resp) {
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
