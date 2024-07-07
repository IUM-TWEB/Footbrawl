const queries = require("../queries/club_games_queries");

module.exports.getByGame = async (req, res) => {
    const {game} = req.params
    if(!game){
        res.json({
            success: false,
            status: 500,
            message: "bad request",
            data: null
        })
    }else
    try {
        const mongo_resp = await queries.getByGame(game)

        if ( !mongo_resp === '' || Array.isArray(mongo_resp)  && mongo_resp.length===0 || !mongo_resp) {
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
    const {club} = req.params
    if(!club){
        res.json({
            success: false,
            status: 500,
            message: "bad request",
            data: null
        })
    }else
    try {
        const mongo_resp = (await  queries.getByClub(club))
        if ( !mongo_resp === '' || Array.isArray(mongo_resp)  && mongo_resp.length===0 || !mongo_resp) {
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

module.exports.getByClubAndHosted = async (req, res) => {
    const {club, hosted} = req.params
    try {
        const mongo_resp = (await  queries.getByClub(club,hosted))
        if ( !mongo_resp === '' || Array.isArray(mongo_resp)  && mongo_resp.length===0 || !mongo_resp) {
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