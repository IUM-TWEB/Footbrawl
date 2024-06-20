const queries = require('../queries/games_queries')


module.exports.getById = async (req, res) => {
    await queries.getById(req.params.id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getBySeasonAndComp = async (req, res) => {
    await queries.getByComp(req.params.comp, req.params.season)
        .then(resp => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getByCompLast = async (req, res) => {
    await queries.getByCompLast(req.params.comp)
      .then(resp => {
          res.send(resp)
      })
      .catch((err) => {
          console.log(err)
          res.send(err.name)
      })
}

module.exports.getByClub = async (req, res) => {
    await queries.getByClub(req.params.comp, parseInt(req.params.season), req.params.game_id)
        .then(resp => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getPosition = async (req, res) => {
    try {
        const club_ids = []/*get all the club_id in the database */

        for (i of club_ids)
            await queries.getPosition(Number(i))
                .then(resp => {
                    const competition_name = "test"

                    /*add in each the name of the club and competition_name to the record*/
                    /*post the result in postgres*/

                    // res.send(resp)

                })
                .catch(e => {
                    console.log(e)
                })
    }catch (e){
        console.log(e.name)
        res.send(e.name)
    }
}
