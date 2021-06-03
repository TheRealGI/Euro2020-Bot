const moment = require('../../util/date');
const matchService = require('../../service/match-service');
module.exports = {
    name: 'today',
    needsArgs: false,
     async execute(message, args) {
        var msg = ""; 
        let dateToday = new Date();
        moment.getUtcDate(dateToday.setDate(dateToday.getDate()))

        var matchesToday =  await matchService.getMatchesByDate(dateToday);

        if(!matchesToday || matchesToday.length < 1) {
            return message.channel.send(`No match found for today`)
        }
         msg = buildMessage(msg, matchesToday);
         return message.channel.send(msg);
    }
}

function buildMessage(msg, matches) {
      matches.map(x => msg+= "\uFFED " + "\xa0\xa0\xa0\xa0" + x.HomeName + ' vs. ' + x.AwayName+ '   ' + moment.getUTCTimestamp(x.Timestamp) + "\n" )
      return msg;
}