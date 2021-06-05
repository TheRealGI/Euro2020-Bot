const matchRepository = require('../db/repository/match-repository');
const mapper = require('../db/mapper/match');

const getMatchById =  async function(id) {
      return await matchRepository.getMatchById(id).then(result => {return result[0]});
}

const getAllMatches = async function () {
      return await matchRepository.getAllMatches().then(result => {return mapper.MapToMatchDtoArray(result)});
}

const refreshAllMatches = async function () {
      return await matchRepository.refreshMatches();
}

const getMatchesByDate = async function (date) {
      let utcNow = new Date(date);
      return  await matchRepository.getMatchByDate(utcNow).then( result => {
            return mapper.MapToMatchDtoArray(result);
      });
}

module.exports = {getMatchById, getAllMatches, refreshAllMatches, getMatchesByDate};