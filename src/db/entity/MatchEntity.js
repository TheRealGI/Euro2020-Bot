class MatchEntity {
    Id;
    Timestamp;
    Status;
    Duration;
    HomeScore;
    AwayScore;
    HomeName;
    AwayName;

    constructor (match) {
        this.Id = match.id;
        this.Timestamp = match.utcDate;
        this.Status = match.status;
        this.Duration = match.duration;
        this.HomeScore = match.score.fullTime.homeTeam;
        this.AwayScore = match.score.fullTime.awayTeam;
        this.HomeName = match.homeTeam.name;
        this.AwayName = match.awayTeam.name;
    }
}

module.exports = MatchEntity;