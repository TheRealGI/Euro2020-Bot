const moment = require('../../util/date');
const matchService = require('../../service/match-service');
const StateDto = require('../../db/dto/StateDto');
const Discord = require("discord.js");
module.exports = {
    name: 'today',
    needsArgs: false,
    async execute(message, args) {
        let dateToday = new Date();
        moment.getUtcDate(dateToday.setDate(dateToday.getDate()))

        var matchesToday = await matchService.getMatchesByDate(dateToday);

        if (!matchesToday || matchesToday.length < 1) {
            return message.channel.send(`No match found for today`)
        }
        let embed = buildMessage(matchesToday);

        return message.channel.send(embed);
    }
}

function buildMessage( matches) {
    let msg = "";
    let state = new StateDto();
    matches.map(x => {
        switch (x.Status) {
            case state.SCHEDULED:
                msg += x.HomeName + ' vs. ' + x.AwayName + '   ' + x.Timestamp + "\n";
                break;

            case state.INPLAY:
                msg += "\uFFED " + x.HomeName + ' vs. ' + x.AwayName + '   ' + x.HomeScore + ' : ' + x.AwayScore + "\n";
                break;

            case state.FINISHED:
                msg += "Finished\t" + x.HomeName + ' vs. ' + x.AwayName + ' -->  ' + x.HomeScore + ' : ' + x.AwayScore + "\n";
                break;

            default:
                break;
        }
    });
    let embed = new Discord.MessageEmbed()
        .setColor(0x5ee59d)
        .addField('Todays schedule:', msg);
    return embed;
}