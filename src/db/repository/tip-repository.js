const db = require('../knex');


function getTipByUserId (userId) {
    return db.dbConnection("TipEntity").select("*")
    .where("UserId", userId);
}

function addTip (tip) {
    return db.dbConnection("TipEntity").insert(tip).then( () => {
        return true;
    }).catch(() => {
        return false;
    });
    
}

function getTipByUserIdAndMatchId (userId, matchId) {
    return db.dbConnection("TipEntity").select("*").where("UserId", userId).andWhere("MatchId", matchId);
}

module.exports = {getTipByUserId, addTip, getTipByUserIdAndMatchId};

