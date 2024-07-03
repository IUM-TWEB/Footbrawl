const queries = require('../queries/game_lineups_queries')

const getById = async (req, res) => {
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
  const {player} = req.params
  if(!player){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getByPlayer(player))
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
  const {club} = req.params
  if(!club){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await  queries.getByClub(club))
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
  const {player,pos} = req.params
  if(!(player && pos)){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await  queries.getByPlayerAndPosition(player, pos))
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