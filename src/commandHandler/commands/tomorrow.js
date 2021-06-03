const moment = require('../../util/date');
const matchService = require('../../service/match-service');
module.exports = {
    name: 'tomorrow',
    needsArgs: false,
     async execute(message, args) {
        var msg = ""; 
        let dateTomorrow = new Date();
        moment.getUtcDate(dateTomorrow.setDate(dateTomorrow.getDate() + 1))
        var matchesTomorrow =  await matchService.getMatchesByDate(dateTomorrow);
        if(!matchesTomorrow || matchesTomorrow.length < 1) {
            return message.channel.send(`No matches found for tomorrow`);
        }
         msg = buildMessage(msg, matchesTomorrow);
         return message.channel.send(msg);
    }
}

function buildMessage(msg, matches) {
      matches.map(x => msg+= "\uFFED " + "\xa0\xa0\xa0\xa0" + x.HomeName + ' vs. ' + x.AwayName+ '   ' + moment.getUTCTimestamp(x.Timestamp) + "\n" )
      return msg;
}