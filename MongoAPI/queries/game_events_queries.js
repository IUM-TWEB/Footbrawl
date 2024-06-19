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
/**
* Per ora la query fa la seguente cosa:
 * Prende L'ultimo anno presente nel db e filtra per competizione e type:Goals i documenti.
 * TODO:
 * bisogna ancora contare per player il numero di goal fatti
 * nb: per la ricerca non utilizzare il nome della competizione ma l'id (es: IT1)
* */
const test = async (competition) => {
  const latestYearDoc = await queries.findOne({},{},null).sort("-date");

  if (!latestYearDoc) {
    console.log("Nessun documento trovato.");
    return;
  }

  const a= new Date(latestYearDoc.date)
  const date = new Date(a.getFullYear(), 0, 1); // Imposta il mese a gennaio (0) e il giorno a 1
  date.setUTCHours(0, 0, 0, 0); // Imposta ore, minuti, secondi e millisecondi a 0

  return queries.aggregate([
    {
      $match: {type: "Goals", date:{$gte:date}}
    },
    {
      $lookup: {
        from: 'games', // il nome della collezione di destinazione
        localField: 'game_id', // il campo nella collezione 'game_events'
        foreignField: '_id', // il campo corrispondente nella collezione 'games'
        as: 'gameDetails' // il nome del nuovo campo che conterrà i dati uniti
      }
    },
    {
      $unwind: '$gameDetails' // De-normalizza il risultato del lookup
    },
    {
      $addFields: {
        competition_id: '$gameDetails.competition_id' // Aggiungi/trasferisci il competition_id
      }
    },
    {
      $project: {
        game_id: 0, // Opzionale: rimuovi il game_id se non è più necessario
        gameDetails: 0
      }
    },
    {
      $match: {competition_id: competition}
    },
    {
      $sort:{
        date:-1
      }
    },
  ])


}

module.exports = {getByPlayer, getByClub, getById, getGoalDatesByPlayerIn, getAssistDatesByPlayerIn, test,}