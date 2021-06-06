const db = require('../knex');
const StateDto = require('../dto/StateDto');


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

function getAllAvailableTipsByUserId (userId){
    return db.dbConnection("TipEntity").select("*").where("UserId", userId).innerJoin("MatchEntity", "MatchId", "MatchEntity.Id");
}

function getTipsToCalc() {
    let state = new StateDto();
    return db.dbConnection("TipEntity").select("TipEntity.Id", "TipEntity.UserId", "TipEntity.MatchId", "TipEntity.TipHome", "TipEntity.TipAway", "MatchEntity.HomeScore", "MatchEntity.AwayScore").where("IsCalculated", 0).join("MatchEntity", function() {
        this.on("MatchEntity.Id", "MatchId")
        this.andOnVal("MatchEntity.Status", "=", state.FINISHED)
    });
}

function updateTipScoreStatus(id, status) {
    return db.dbConnection("TipEntity").where("Id", id).update({IsCalculated: status}).then( () => {
        return true;
    }).catch( () => {
        return false;
    });
}

module.exports = {getTipByUserId, addTip, getTipByUserIdAndMatchId, getAllAvailableTipsByUserId, getTipsToCalc, updateTipScoreStatus};

