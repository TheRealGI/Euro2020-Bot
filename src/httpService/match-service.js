const httpService = require('./http-service-base');

const getMatchById =  async function(id) {
      return httpService.getHttpRequest(`/v2/matches/${id}`).then(result => {return result.match});
}

module.exports = {getMatchById};