const queries = require('../queries/appearances_queries')

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
    if(mongo_resp === ''){
      res.json({
        success:false,
        status:404,
        message: "No resource found",
        data: null
      })
    }else{
      res.json({
        success:true,
        status:200,
        message: "",
        data: mongo_resp
      })
    }
  } catch (e) {
    res.json({
      success:false,
      status:500,
      message: "internal server error",
      data: null
    })
  }

}

const getByPlayer = async(req, res) => {
  const {player_id} = req.params
  if(!player_id){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getById(player_id))
    if(mongo_resp === ''){
      res.json({
        success:false,
        status:404,
        message: "No resource found",
        data: null
      })
    }else{
      res.json({
        success:true,
        status:200,
        message: "",
        data: mongo_resp
      })
    }
  } catch (e) {
    res.json({
      success:false,
      status:500,
      message: "internal server error",
      data: null
    })
  }
}

const getByGame = async (req, res) => {
  const {game_id} = req.params
  if(!game_id){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getById(game_id))
    if(mongo_resp === ''){
      res.json({
        success:false,
        status:404,
        message: "No resource found",
        data: null
      })
    }else{
      res.json({
        success:true,
        status:200,
        message: "",
        data: mongo_resp
      })
    }
  } catch (e) {
    res.json({
      success:false,
      status:500,
      message: "internal server error",
      data: null
    })
  }
}

const getByGP = async (req, res) => {
  const {game_id, player_id} = req.params
  if(!(game_id && player_id)){
    res.json({
      success: false,
      status: 500,
      message: "bad request",
      data: null
    })
  }
  try {
    const mongo_resp = (await queries.getByGP(parseInt(game_id), parseInt(player_id)))
    if(mongo_resp === ''){
      res.json({
        success:false,
        status:404,
        message: "No resource found",
        data: null
      })
    }else{
      res.json({
        success:true,
        status:200,
        message: "",
        data: mongo_resp
      })
    }
  } catch (e) {
    res.json({
      success:false,
      status:500,
      message: "internal server error",
      data: null
    })
  }
}
module.exports = {getById, getByGame, getByPlayer, getByGP}