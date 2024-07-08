const games = require('../models/games')

const getById = (id) => {
    return games.findOne({_id: id}, {}, null)
}

const getByComp = (comp, season) => {
    return games.find({competition_id:comp, season:season}, {}, null)
}
const getByCompLast = (comp, season) => {
    return games.find({ competition_id: comp })
      .sort({ date: -1 })
      .limit(3);
}

async function getManagerNameByClubId(clubId) {
    const parsedClubId = parseInt(clubId);

    const game = await games.findOne({
        $or: [
            { home_club_id: parsedClubId },
            { away_club_id: parsedClubId }
        ]
    }).sort({ season: -1 });

    if (!game) {
        return null;
    }

    if (game.home_club_id === parsedClubId) {
        return game.home_club_manager_name;
    } else if (game.away_club_id === parsedClubId) {
        return game.away_club_manager_name;
    }

    return null;
}

const getByClubLast = (club, season) => {
    return games.find({
        $or: [
            { away_club_id: club },
            { home_club_id: club }
        ]
    })
      .sort({ date: -1 })
      .limit(9);
}
const getByClub = (comp, season, club_id) => {
    return games.find({competition_id:comp, season:season, home_club_id :club_id }, {}, null)
}

const getPosition = (teamId) => {
    // teamId = 2700
    return games.aggregate([
        {
            $match: {
                $or: [
                    { home_club_id: teamId },
                    { away_club_id: teamId }
                ]
            }
        },
        {
            $sort: { date: -1 }
        },
        {
            $group: {
                _id: {
                    season: "$season",
                    competition_id: "$competition_id"
                },
                last_match_date: { $first: "$date" },
                club_id: { $first: { $cond: [{ $eq: ["$home_club_id", teamId] }, "$home_club_id", "$away_club_id"] } },
                position: { $first: { $cond: [{ $eq: ["$home_club_id", teamId] }, "$home_club_position", "$away_club_position"] } }
            }
        },
        {
            $match: {
                position: { $ne: null }
            }
        },
        {
            $project: {
                _id: 0,
                season: "$_id.season",
                competition_id: "$_id.competition_id",
                last_match_date: 1,
                club_id: 1,
                position: 1
            }
        }
    ])
}

module.exports = {getByClub, getByComp, getById, getPosition, getByCompLast, getByClubLast, getManagerNameByClubId}
