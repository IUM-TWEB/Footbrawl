const queries = require('../queries/news_queries');

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
};

module.exports.getAll = async (req, res) => {
  try {
    const mongo_resp = (await queries.getAll())
    console.log(mongo_resp, "mongo resp news")
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

};
