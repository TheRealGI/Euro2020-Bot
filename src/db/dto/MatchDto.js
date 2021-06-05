const moment = require('../../util/date');
const TBD = "TBD";
class MatchDto {
    Id;
    Timestamp;
    Date;
    Status;
    Duration;
    HomeScore;
    AwayScore;
    HomeName;
    AwayName;

    constructor (match) {
        this.Id = match.Id;
        this.Timestamp = moment.getUTCTimestamp(match.Timestamp);
        this.Date = moment.getUTCDateWithoutYear(match.Timestamp);
        this.Status = match.Status;
        this.Duration = match.Duration;
        this.HomeScore = match.HomeScore
        this.AwayScore = match.AwayScore;
        this.HomeName = setTBDForUnknownMatches(match.HomeName);
        this.AwayName = setTBDForUnknownMatches(match.AwayName);
    }
}

function setTBDForUnknownMatches (name) {
    return name ?? TBD
}

module.exports = MatchDto;