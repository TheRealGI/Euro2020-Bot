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
        this.HomeName = replaceNameWithCode(match.homeTeam.name);
        this.AwayName = replaceNameWithCode(match.awayTeam.name);
    }
}

function replaceNameWithCode(country) {
    switch(country){
        case "Turkey":
            return ":flag_tr:";
        case "Italy":
            return ":flag_it:";
        case "Wales":
            return ":wales:";
        case "Switzerland":
            return ":flag_ch:";
        case "Denmark": 
            return ":flag_dk:";
        case "Finland":
            return ":flag_fi:";
        case "Belgium":
            return ":flag_be:";
        case "Russia":
            return ":flag_ru:";
        case "England":
            return ":england:";
        case "Croatia":
            return ":flag_hr:";
        case "Austria":
            return  ":flag_at:";
        case "North Macedonia":
            return  ":flag_mk:";
        case "Netherlands":
            return  ":flag_nl:";
        case "Ukraine":
            return  ":flag_ua:";
        case "Scotland":
            return ":scotland:";
        case "Czech Republic":
            return  ":flag_cz:";
        case "Poland":
            return  ":flag_pl:";
        case "Slovakia":
            return ":flag_sk:";
        case "Spain":
            return  ":flag_es:";
        case "Sweden":
            return ":flag_se:";
        case "Hungary":
            return ":flag_hu:";
        case "Portugal":
            return ":flag_pt:";
        case "France":
            return ":flag_fr:";
        case "Germany":
            return  ":flag_de:";
        default:
            return country;
    }
}

module.exports = MatchEntity;