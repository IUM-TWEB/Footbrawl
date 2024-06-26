const queries = require("../queries/club_games_queries");

module.exports.getByGame = async (req, res) => {
    try {
        const mongo_resp = (await queries.getByClub(req.params.game))
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

module.exports.getByClub = async (req, res) => {
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

module.exports.getByClubAndHosted = async (req, res) => {
    try {
        const mongo_resp = (await  queries.getByClub(req.params.club, req.params.hosted))
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