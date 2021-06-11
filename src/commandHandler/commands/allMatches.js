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
    var fields = new Array();
    let msg = "";
    let state = new StateDto();
    matches.map(x => {
        switch (x.Status) {
            case state.SCHEDULED:
                msg += x.Id + " "+x.HomeName + " vs. " + x.AwayName +"\n";
                break;

            case state.INPLAY:
            case state.PAUSED:
                msg += x.Id + " " + x.HomeName + ' vs. ' + x.AwayName + '   ' + x.HomeScore + ' : ' + x.AwayScore + "  \uFFED \n";
                break;

            case state.FINISHED:
                msg += x.Id + "\t\t" + x.HomeName + ' vs. ' + x.AwayName + '   **' + x.HomeScore + ' : ' + x.AwayScore + "**\n";
                break;

            default:
                break;
        }
        if(msg.length > 950) {
            fields.push( {name :"ID\n", value: msg , inline: true});
            msg = "";
        }
    });

    if(msg.length > 0) {
        fields.push({name :"ID\n", value: msg , inline: true});
    }

    return createEmbed(fields);
}

function createEmbed(fields) {
    var embed = new Discord.MessageEmbed()
        .setColor(0x5ee59d)
        .setTitle('All matches schedule:')
        .addFields(fields)
        .setFooter("\uFFED indicates a live match. Bold results indicates that the match is finished");
    return embed;
}