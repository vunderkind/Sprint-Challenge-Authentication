const db = require('../database/dbConfig');

module.exports = {
register,
login,
getAll,
}

function getAll(){
    return db('users')
    .select('id', 'username')
}

function register(newUser){
    return db('users')
    .insert(newUser);
}

function login(username){
    return db('users')
    .where({username})
    .first();
}