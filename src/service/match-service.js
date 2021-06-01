const httpService = require('../httpService/http-service-base');
const matchRepository = require('../db/repository/match-repository');

const getMatchById =  async function(id) {
      return await matchRepository.getMatchById(id).then(result => {return result[0]});
      // return httpService.getHttpRequest(`/v2/matches/${id}`).then(result => {return result.match});
}

const getAllMatches = async function () {
      return await matchRepository.getAllMatches().then(result => {return result});
}

module.exports = {getMatchById, getAllMatches};