const MatchDto = require('../dto/MatchDto');
const matchEntity = require('../entity/MatchEntity');

const MapToMatchArray = function(match) {
    if(match != null)
    {
        let matches = [];

        match.forEach(match => {
            matches.push(new matchEntity(match));
        });
        return matches;
    }
    return match;
}

const MapToMatchDtoArray = function(matches) {
    return matches.map( match => new MatchDto(match));
}

module.exports = { MapToMatchArray, MapToMatchDtoArray };