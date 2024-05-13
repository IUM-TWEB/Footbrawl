const queries = require('../queries/user_queries')

module.exports.getUsr = (req, res) => {
    queries.getUsr(req.params.name, req.params.pwd)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.postUsr = (req, res) => {
    console.log("mandiamo")
    queries.postUsr(req.params.name, req.params.pwd)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}
