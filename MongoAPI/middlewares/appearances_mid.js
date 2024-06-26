const queries = require('../queries/appearances_queries')

const getById = async (req, res) => {
  try {
    const mongo_resp = (await queries.getById(req.params.id))
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
  try {
    const mongo_resp = (await queries.getById(req.params.player_id))
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
  try {
    const mongo_resp = (await queries.getById(req.params.game_id))
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
  try {
    const mongo_resp = (await queries.getByGP(parseInt(req.params.game_id), parseInt(req.params.player_id)))
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