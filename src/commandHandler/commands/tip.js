const StateDto = require('../../db/dto/StateDto');
const Discord = require('discord.js');
const mapper = require('../../db/mapper/user');
const userService = require('../../service/user-service');
module.exports = {
    name: 'tip',
    needsArgs: false,
    async execute(message, args) {
        var msg = "";
        if (!args || args.length < 1) {
            let simpleDto = mapper.MapToSimpleDto({UserId: message.author.id, UserName: message.author.username, ServerId: message.channel.guild.id})
            let userDto = await userService.addUserIfNotExists(simpleDto);
            var availableTip = 0; // todo here
            msg = " zeige alle tips an die noch offen sind :)";
        }
        else if (args.length < 3) {
            msg = " not all arguments were defined. There are three arguments needed: <matchId> <HomeTeamScore> <AwayTeamScore>";
        }
        else if (!validateArgs(args)) {
            // print args missing error
            msg = "there is only nummbers supported for this command";
        }
        else {
            msg = "dann legen wir mal los";
        }

        return message.channel.send(msg);
    }
}

function validateArgs(args) {
    // there are not more then 3 args to consider
    args.length = 3;
    let valid = args.every(x => {
        return !isNaN(x);
    })
    return valid;
}

function buildMessage(matches) {
    let msg = "";
    let state = new StateDto();
    matches.map(x => {
        switch (x.Status) {
            case state.SCHEDULED:
                msg += x.Id + ' ' + x.HomeName + ' vs. ' + x.AwayName + "\n";
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