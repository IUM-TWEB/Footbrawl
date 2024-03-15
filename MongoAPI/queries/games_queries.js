const games = require('../models/games')

const getById = (id) => {
    return games.findOne({_id: id}, {}, null)
}

const getByComp = (comp, season) => {
    return games.find({competition_id:comp, season:season}, {}, null)
}

const getByClub = (comp, season, club_id) => {
    return games.find({competition_id:comp, season:parseInt(season), home_club_id :club_id }, {}, null)
}

module.exports = {getByClub, getByComp, getById}