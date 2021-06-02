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

module.exports = { MapToMatchArray };