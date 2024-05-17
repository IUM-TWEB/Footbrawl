const axios = require('axios')
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
  const ids = await axios.get("http://localhost:8080/clubIds")

  try {
    let a = 1
    for (const i of ids.data)
      await queries.getPosition(Number(i))
        .then(async resp => {

          for (x of resp) {
            x.ranking_id = a
            a++
            let res = await axios.get(`http://localhost:8080/club?id=${i}`)

            if (res.data)
              x.club_name = res.data.name// inserire qui il nome del club
            res = await axios.get(`http://localhost:8080/competition?id=${x.competition_id}`)

            if (res.data)
              x.competition_name = res.data.name//inserire il nome della competizione
            await axios.post('http://localhost:8080/saveClubRanking', x)
          }
        })

        .catch(e => {
            res.send("ERROR")
          console.log(e)
        })
      res.send("finito")
  } catch (e) {
    console.log(e)
    res.send(e)
  }
}
