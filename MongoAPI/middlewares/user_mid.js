const queries = require('../queries/user_queries')

module.exports.getUsr = (req, res) => {
    queries.getUsr(req.body.name, req.body.pwd)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.postUsr = (req, res) => {
    queries.postUsr(req.body.name, req.body.pwd)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}
