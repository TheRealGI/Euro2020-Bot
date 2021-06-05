const tipRepository = require('../db/repository/tip-repository');
const matchRepository = require('../db/repository/match-repository');
const matchMapper = require('../db/mapper/match');
const StateDto = require('../db/dto/StateDto');

const getAvailableTipsByUserId = async function(userId) {
    var utcNow = new Date();
    var state = new StateDto();

    let userTipsIds = await tipRepository.getTipByUserId(userId).then(result => result.map(x => x.MatchId));
    let availableMatches = await matchRepository.getAllMatches().then(result => {
        let filteredResult = result.filter(match => {
            if( utcNow.getTime() < new Date(match.Timestamp).getTime() && match.Status === state.SCHEDULED && match.HomeName && match.AwayName) {
                return true;
            }
            return false;
        });
        return matchMapper.MapToMatchDtoArray(filteredResult);
    });
    if(userTipsIds.length > 0) {
        return availableMatches.filter(x => {
            return userTipsIds.includes(x.Id) ?  false : true;
        });
    }
    return availableMatches;
}

module.exports = {getAvailableTipsByUserId};