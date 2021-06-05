class TipEntity {
    Id;
    UserId;
    MatchId;
    TipHome;
    TipAway;
    IsCalculated;

    constructor (tip) {
        this.Id = tip.Id;
        this.UserId = tip.UserId;
        this.MatchId = tip.MatchId;
        this.TipHome = tip.Home;
        this.TipAway = tip.TipAway;
        this.IsCalculated = tip.IsCalculated;
    }
}

module.exports = TipEntity;