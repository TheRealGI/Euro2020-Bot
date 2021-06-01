const db = require('../knex')

function getAllMatches()  {
    return db.dbConnection("MatchEntity").select("*");
}

function getMatchById(id) {
    return db.dbConnection("MatchEntity").where("Id", id);
}

module.exports = { getAllMatches, getMatchById};