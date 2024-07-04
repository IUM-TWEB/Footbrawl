const queries = require('../models/game_events')

const getById = (id) => {
  return queries.find({_id: id}, {}, null)
}

const getByPlayer = (player) => {
  return queries.find({player_id: player}, {}, null)
}

const getByClub = (club) => {
  return queries.find({club_id: club}, {}, null)
}

const getGoalDatesByPlayerIn = (player_in) => {
    return queries.find({player_id: player_in, type: "Goals"}, {
        _id: 0,
        game_id: 0,
        minute: 0,
        type: 0,
        club_id: 0,
        player_id: 0,
        description: 0,
        player_in_id: 0,
        player_assist_id: 0,
    }, null)
}

const getAssistDatesByPlayerIn = (player_in) => {
    return queries.find({player_assist_id: player_in, type: "Goals"}, {
        _id: 0,
        game_id: 0,
        minute: 0,
        type: 0,
        club_id: 0,
        player_id: 0,
        description: 0,
        player_in_id: 0,
        player_assist_id: 0,
    }, null)
}

const getTopScorer = async (competition) => {
  // Define the date range
  const startDate = new Date(Date.UTC(2021, 7, 1, 0, 0, 0)); // August 1, 2021
  const endDate = new Date(Date.UTC(2022, 6, 31, 23, 59, 59)); // July 31, 2022

  const pipeline = [
    {
      $match: {
        type: "Goals",
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $lookup: {
        from: 'games',
        localField: 'game_id',
        foreignField: '_id',
        pipeline: [
          { $match: { competition_id: competition } },
          { $project: { competition_id: 1 } }
        ],
        as: 'gameDetails'
      }
    },
    {
      $unwind: '$gameDetails'
    },
    {
      $group: {
        _id: "$player_id",
        totalGoals: { $sum: 1 }
      }
    },
    {
      $sort: { totalGoals: -1 }
    },
    {
      $limit: 15
    },
    {
      $project: {
        player_id: "$_id",
        totalGoals: 1,
        _id: 0
      }
    },
    {
      $sort: { totalGoals: -1 } // Final sorting by total goals in descending order
    }
  ];

  console.log("Pipeline di aggregazione:", JSON.stringify(pipeline, null, 2));

  try {
    const result = await queries.aggregate(pipeline).exec();
    console.log("Risultato aggregazione:", result);
    return result;
  } catch (error) {
    console.error("Errore durante l'aggregazione:", error);
    throw error;
  }
}


module.exports = {getByPlayer, getByClub, getById, getGoalDatesByPlayerIn, getAssistDatesByPlayerIn, getTopScorer}
