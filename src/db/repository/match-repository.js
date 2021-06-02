const db = require('../knex')
const httpService = require('../../httpService/http-service-base');
const mapper = require('../mapper/match');

function getAllMatches() {
    return db.dbConnection("MatchEntity").select("*");
}

function getMatchById(id) {
    return db.dbConnection("MatchEntity").where("Id", id);
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

module.exports = { getAllMatches, getMatchById, refreshMatches };