const tipRepository = require('../db/repository/tip-repository');
const matchRepository = require('../db/repository/match-repository');
const userService = require('../service/user-service');
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

const getMatchForTipByMatchId = async function (matchId) {
    return await matchRepository.getMatchById(matchId);
}

const addTip = async function (args, userId) {
    let tip = {UserId: userId, MatchId: args[0], TipHome: args[1], TipAway: args[2]};
    return await tipRepository.addTip(tip);
}

const getTipByMatchId = async function(userId, matchId)
{
    return tipRepository.getTipByUserIdAndMatchId(userId, matchId);
}

const getAllAvailableTipsByUserId = async function(userId) {
    return tipRepository.getAllAvailableTipsByUserId(userId);
}

const updateTip = async function (id, status) {
    return tipRepository.updateTipScoreStatus(id ,status);
}

const updateRanking = async function() {
    let tips= await tipRepository.getTipsToCalc();
    if(tips.length > 0) {
    return  await calcTips(tips);
    }
    return true   
}

async function calcTips(tips) {
    let tipResults  = new Array
    tips.map( async tip => {
        var res = await updateScore(tip);
        tipResults.push(res);
    });

    return !tipResults.includes(false);
}

 async function updateScore(tip) {
    let points = calcScore(tip);
    let sucessfullUserscoreUpdated = true;
    if( points > 0)
    {
        sucessfullUserscoreUpdated = await userService.updateScoreById( tip.UserId, points);
    }

    if(sucessfullUserscoreUpdated) {
        sucessfullUserscoreUpdated = await updateTip(tip.Id, 1);
    }

    return sucessfullUserscoreUpdated;

}

function calcScore(tip) {
    //first check if we have a exact match
    if (tip.HomeScore === tip.TipHome && tip.AwayScore === tip.TipAway)
    {
        return 10;
    }

    // make further calculation
    let TDiff; // the expected diffrence
    let TTrend; //the expected winner 0 = Home, 1 Away, 2 Tie
    let RTrend;// the actual diffrence
    let RDiff; // the actual winner 0 = Home, 1 Away, 2 Tie

    // evaluate expected trend and difference
    if (tip.TipHome > tip.TipAway) {
        TDiff = tip.TipHome - tip.TipAway;
        TTrend = 0;
    } else if (tip.TipHome < tip.TipAway) {
        TDiff = tip.TipAway - tip.TipHome
        TTrend = 1;
    } else {
        TDiff = 0;
        TTrend = 2;
    }

    // evaluate actual trend 
    if (tip.HomeScore > tip.AwayScore) {
        RDiff = tip.HomeScore - tip.AwayScore;
        RTrend = 0;
    } else if (tip.HomeScore < tip.AwayScore) {
        RDiff = tip.AwayScore - tip.HomeScore;
        RTrend = 1;
    } else {
        RDiff = 0;
        RTrend = 2;
    }

    if(TDiff === RDiff)
    {
        return 5;
    } else if(TTrend === RTrend) {
        return 2;
    }
    return 0;
}

module.exports = {getAvailableTipsByUserId, getMatchForTipByMatchId, addTip, getTipByMatchId, getAllAvailableTipsByUserId,updateRanking, updateTip};