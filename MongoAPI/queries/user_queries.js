const model = require('../models/user')

const getUsr = async (name, pwd) => {
    try {
        const user = await model.find({ user_name: name, pwd: pwd }, {}, null);
        console.log('Query result:', name, pwd); // Log per il debug
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const getUsrByName = (name, pwd) => {
    return model.find({user_name:name},{}, null)
}

const postUsr = (name, pwd) => {
    return model.create([{user_name: name, pwd: pwd}],{})
}
module.exports = {getUsr,postUsr,getUsrByName}