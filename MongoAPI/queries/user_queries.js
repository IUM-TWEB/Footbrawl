const model = require('../models/user')

const getUsr = (name, pwd) => {
    return model.find({user_name: name, pwd: pwd}, {}, null)
}

const postUsr = (name, pwd) => {
    return model.create([{user_name: name, pwd: pwd}],{})
}
module.exports = {getUsr,postUsr}