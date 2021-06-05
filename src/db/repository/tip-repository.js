const db = require('../knex');


function getTipByUserId (userId) {
    return db.dbConnection("TipEntity").select("*")
    .where("UserId", userId);
}

module.exports = {getTipByUserId};

