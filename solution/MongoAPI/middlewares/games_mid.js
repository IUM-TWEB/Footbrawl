const queries = require('../queries/games_queries')


module.exports.getById = async (req, res) => {
  const {id} = req.params
  if(!id){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getById(id))
    if ( !mongo_resp === '') {
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

module.exports.getBySeasonAndComp = async (req, res) => {
  const {comp, season} = req.params
  if(!(season && comp)){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getByComp(comp, season))
    if ( !mongo_resp === '') {
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

module.exports.getByCompLast = async (req, res) => {
  const {comp} = req.params
  if(!comp){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getByCompLast(comp))
    if ( !mongo_resp === '') {
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

module.exports.getByClubLast = async (req, res) => {
  const {club_id} = req.params
  if(!club_id){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getByClubLast(club_id))

    if ( !mongo_resp === '') {
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

module.exports.getManagerNameByClubId = async (req, res) => {
  const {club_id} = req.params
  if(!club_id){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getManagerNameByClubId(club_id))
    if ( !mongo_resp === '') {
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

module.exports.getByClub = async (req, res) => {
  const {comp, season, game_id} = req.params
  if(!(comp && season && game_id)){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getByClub(comp, parseInt(season), game_id))
    if ( !mongo_resp === '') {
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