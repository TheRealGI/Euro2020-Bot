const MatchDto = require('../db/dto/MatchDto');
const matchRepository = require('../db/repository/match-repository');

const getMatchById =  async function(id) {
      return await matchRepository.getMatchById(id).then(result => {return result[0]});
}

const getAllMatches = async function () {
      return await matchRepository.getAllMatches().then(result => {return result});
}

const refreshAllMatches = async function () {
      return await matchRepository.refreshMatches();
}

const getMatchesForToday = async function () {
      let utcNow = new Date();
      utcNow.setDate(utcNow.getUTCDate());
      return  await matchRepository.getMatchByDate(utcNow).then( result => {
            return result.map(x => new MatchDto(x));
      });
}

module.exports = {getMatchById, getAllMatches, refreshAllMatches, getMatchesForToday};