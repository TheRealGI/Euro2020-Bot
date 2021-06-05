const matchService = require('../../service/match-service');
const StateDto = require('../../db/dto/StateDto');
const Discord = require('discord.js');
module.exports = {
    name: 'allmatches',
    needsArgs: false,
    async execute(message, args) {
        var allMatches = await matchService.getAllMatches();

        if (!allMatches) {
            message.channel.send(`No matches were found. Please try again later`)
        }

        let embed = buildMessage(allMatches);
        return message.channel.send(embed);
    }
}

function buildMessage(matches) {
    let msg = "";
    let state = new StateDto();
    matches.map(x => {
        switch (x.Status) {
            case state.SCHEDULED:
                msg += x.Id + ' '+x.HomeName + ' vs. ' + x.AwayName +"\n";
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

    return createEmbed(msg);
}

function createEmbed(msg) {
    var fields = new Array();
    while (msg.length > 0) {
        fields.push({ name: "ID\tHomeTeam\tAwayTeam", value: msg.substr(0, 1017), inline: false });
        msg = msg.slice(1017);
    }

    var embed = new Discord.MessageEmbed()
        .setColor(0x5ee59d)
        .setTitle('All matches schedule:')
        .addFields(fields)
        .setFooter("Use the match command and a Id to get more details");

    return embed;
}