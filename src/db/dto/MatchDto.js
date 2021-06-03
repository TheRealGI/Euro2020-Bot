class MatchDto {
    Id;
    Timestamp;
    Status;
    Duration;
    HomeScore;
    AwayScore;
    HomeName;
    AwayName;

    constructor (match) {
        this.Id = match.Id;
        this.Timestamp = match.Timestamp;
        this.Status = match.Status;
        this.Duration = match.Duration;
        this.HomeScore = match.HomeScore
        this.AwayScore = match.AwayScore;
        this.HomeName = match.HomeName;
        this.AwayName = match.AwayName;
    }
}

module.exports = MatchDto;