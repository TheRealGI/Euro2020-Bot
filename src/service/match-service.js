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

const getMatchesByDate = async function (date) {
      let utcNow = new Date(date);
      return  await matchRepository.getMatchByDate(utcNow).then( result => {
            return result.map(x => new MatchDto(x));
      });
}

module.exports = {getMatchById, getAllMatches, refreshAllMatches, getMatchesByDate};