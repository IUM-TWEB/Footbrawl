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
    const latestYearDoc = await queries.findOne({}, {}, null).sort("-date");

    if (!latestYearDoc) {
        console.log("Nessun documento trovato.");
        return;
    }

    const a = new Date(latestYearDoc.date);
    const date = new Date(a.getFullYear(), 0, 1); // Imposta il mese a gennaio (0) e il giorno a 1
    date.setUTCHours(0, 0, 0, 0); // Imposta ore, minuti, secondi e millisecondi a 0

    const pipeline = [
        {
            $match: { type: "Goals", date: { $gte: date } }
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
                competition_id: '$gameDetails.competition_id',
                player_id: '$player_id' // Aggiungi player_id se non esiste già
            }
        },
        {
            $project: {
                game_id: 0, // Opzionale: rimuovi il game_id se non è più necessario
                gameDetails: 0
            }
        },
        {
            $match: { competition_id: competition }
        },
        {
            $group: {
                _id: "$player_id", // Raggruppa per ID del giocatore
                totalGoals: { $sum: 1 } // Conta il numero di goal per ogni giocatore
            }
        },
        {
            $lookup: {
                from: 'game_lineups', // Unisci con la tabella game_lineups
                localField: '_id', // Campo da game_events
                foreignField: 'player_id', // Campo corrispondente in game_lineups
                as: 'playerDetails' // Nome del nuovo campo che conterrà i dati uniti
            }
        },
        {
            $unwind: '$playerDetails' // De-normalizza il risultato del lookup
        },
        {
            $group: {
                _id: "$_id", // Raggruppa di nuovo per player_id
                totalGoals: { $first: "$totalGoals" }, // Mantieni il numero totale di goal
                playerName: { $first: "$playerDetails.player_name" }, // Mantieni il nome del giocatore
                position: { $first: "$playerDetails.position" }, // Mantieni la posizione
                number: { $first: "$playerDetails.number" } // Mantieni il numero della maglia
            }
        },
        {
            $sort: { totalGoals: -1 } // Ordina in ordine decrescente per numero di goal
        },
        {
            $limit: 15 // Mostra solo i primi 15 risultati
        },
        {
            $project: {
                player_id: "$_id",
                playerName: "$playerName",
                totalGoals: "$totalGoals",
                position: "$position",
                number: "$number"
            }
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


module.exports = {getByPlayer, getByClub, getById, getGoalDatesByPlayerIn, getAssistDatesByPlayerIn, test: getTopScorer,}
