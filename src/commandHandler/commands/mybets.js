const tipService = require('../../service/tip-service');
const userService = require('../../service/user-service');
const Discord = require("discord.js");
module.exports = {
    name: 'mybets',
    needsArgs: false,
    async execute(message, args) {
        let userDto = await userService.getIdByUserId(message);
        let mybets = await tipService.getAllAvailableTipsByUserId(userDto.Id);
        if(mybets.length < 1) {
           return  message.channel.send(`${message.author.username}, you do not have any bets made so far. To get a list of possible matches to bet on use **~bet**. To bet on a match use **~bet <matchId> <HomeTeamScore> <AwayTeamScore>**`);
        }
        let embed = buildMessage(mybets, userDto)
        message.channel.send(embed);
    }
}

function buildMessage(bets, userDto) {
    let fields = new Array();
    var msg = "```ID\t\t\t\tGame\n\n";
    bets.map( x => {
        msg += x.MatchId+ "\t\t" + x.HomeName + " "+ x.TipHome+ " : "+ x.TipAway+ " " + x.AwayName + "\n";
        if(msg.length > 950)
        {
            fields.push({name: "\u200B", value: msg + "```", inline: false});
            msg = "```";
            return;
        }
    });
    fields.push({name: "\u200B", value: msg + "```", inline: false});

    return createEmbed(fields, userDto);
}

function createEmbed(fields, userDto) {
    var embed = new Discord.MessageEmbed()
        .setColor(0x5ee59d)
        .setTitle(`${userDto.UserName} bets`)
        .addFields(fields);
    return embed;
}