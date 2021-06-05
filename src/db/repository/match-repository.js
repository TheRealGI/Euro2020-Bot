const db = require('../knex')
const httpService = require('../../httpService/http-service-base');
const mapper = require('../mapper/match');
const moment = require('../../util/date');

function getAllMatches() {
    return db.dbConnection("MatchEntity").select("*").orderBy("Timestamp", "asc");
}

function getMatchById(id) {
    return db.dbConnection("MatchEntity").where("Id", id);
}

function getMatchByDate(date) {
    let from = moment.getUtcDate(new Date(date));
    let to = new Date(date);
    to.setUTCDate(to.getUTCDate() + 1);
    return db.dbConnection("MatchEntity").whereBetween("Timestamp", [moment.getUtcDate(from), moment.getUtcDate(to)]);
}

async function updateMatch(matches) {
    // HACK: knex does not support batch delete or update --> truncate table and insert it again
    let ids = await db.dbConnection("MatchEntity").select("Id").then(ids => {
        return ids.map(x => x.Id);
    });

    let deletedRow = await db.dbConnection("MatchEntity").whereIn("Id", ids).del();
    if (deletedRow != null) {
        return await db.dbConnection("MatchEntity").insert(matches);
        
    }
    return null;
}

async function refreshMatches() {
    return await httpService.getHttpRequest(`/v2/competitions/EC/matches`).then(async result => {
        if (result != null) {
            let matches = mapper.MapToMatchArray(result.matches);
            let response = await updateMatch(matches);
            return response;
        }
        return null;
    });
}

module.exports = { getAllMatches, getMatchById, refreshMatches, getMatchByDate };