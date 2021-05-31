const matchService = require('../../httpService/match-service');
module.exports = {
    name: 'match',
    needsArgs: true,
     async execute(message, args) {
        if(!args || args.length < 1) {
           return message.channel.send('Missing argument --> ~match <matchId>');
        }

        if(isNaN(+args[0]))
        {
            return message.channel.send('the provided argument <matchId> is not a number');
        }

        var msg = ""; 
        var match =  await matchService.getMatchById(args[0]);

        if(!match) {
            message.channel.send(`No match found with the matchId: ${args[0]}`)
        }
        
         msg = buildMessage(msg, match);
         return message.channel.send(msg);
    }
}

function buildMessage(msg, match) {
     return msg += match.homeTeam.name + "\t"+ match.score.fullTime.homeTeam + ":" + match.score.fullTime.awayTeam+ "\t" + match.awayTeam.name ;
}