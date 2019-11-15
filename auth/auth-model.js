const db = require('../database/dbConfig');

module.exports = {
register,
}

function register(newUser){
    return db('users')
    .insert(newUser);
}