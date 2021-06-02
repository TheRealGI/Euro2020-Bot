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

module.exports = {getMatchById, getAllMatches, refreshAllMatches};