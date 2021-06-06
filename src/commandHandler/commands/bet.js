const Discord = require('discord.js');
const mapper = require('../../db/mapper/user');
const userService = require('../../service/user-service');
const tipService = require('../../service/tip-service');
const StateDto = require('../../db/dto/StateDto');
module.exports = {
    name: 'bet',
    needsArgs: false,
    async execute(message, args) {
        var msg = "";
        if (!args || args.length < 1) {
            let simpleDto = mapper.MapToSimpleDto({UserId: message.author.id, UserName: message.author.username, ServerId: message.channel.guild.id})
            let userDto = await userService.addUserIfNotExists(simpleDto);
            var availableTip = await tipService.getAvailableTipsByUserId(userDto.Id);
            if(availableTip.length < 1)
            {
                return message.channel.send(`${userDto.UserName}, you have no pending matches to bet on at the moment :)`);
            }
            msg = buildMessage(availableTip, userDto);
        }
        else if (args.length < 3) {
            msg = " not all arguments were defined. There are three arguments needed: <matchId> <HomeTeamScore> <AwayTeamScore>";
        }
        else if (!validateArgs(args)) {

            msg = "the arguments <matchId> <HomeTeamScore> <AwayTeamScore> needs to be a number";
        }
        else {
            let simpleDto = mapper.MapToSimpleDto({UserId: message.author.id, UserName: message.author.username, ServerId: message.channel.guild.id});
            let userDto = await userService.addUserIfNotExists(simpleDto);
            let existingBet = await tipService.getTipByMatchId(userDto.Id, args[0]);

            if (existingBet.length > 0) {
                msg = `${userDto.UserName}, you already send a bet for this match. To check all you bets use the myBets command.`
                return message.channel.send(msg);
            }

            let matchToBetOn = await tipService.getMatchForTipByMatchId(args[0]).then(result => {return result[0]});
            
            if(!matchToBetOn) {
                msg = `${userDto.UserName}, there is no Match with the Id: ${args[0]}`;
                return message.channel.send(msg);
            }

            let utcNow = new Date();
            let state = new StateDto();
            if( !(utcNow.getTime() < new Date(matchToBetOn.Timestamp).getTime() && matchToBetOn.Status === state.SCHEDULED && matchToBetOn.HomeName && matchToBetOn.AwayName)) {
                 msg = `${userDto.UserName}, the selected match is to be determined, in play or finished`;
                 return message.channel.send(msg);
            }
            
            let sucessfullyAdded = await tipService.addTip(args, userDto.Id);
            if(!sucessfullyAdded)
            {
                 msg = `${userDto.UserName}, there was error adding your bet. Please try again later`;
                 return message.channel.send(msg);
            } 

                 msg = `${userDto.UserName}, your bet ${matchToBetOn.HomeName} ${args[1]} : ${args[2]}  ${matchToBetOn.AwayName} was sucessfully added.`
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

function buildMessage(matches, userDto) {
    let fields = new Array();
    var msg = "```ID\t\tGame\n";
    matches.map( x => {
        msg += x.Id+ "\xa0" + x.HomeName + "\xa0\xa0vs.\xa0\xa0" + x.AwayName + "\n";
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
        .setTitle(`This bets are available for you ${userDto.UserName}`)
        .addFields(fields)
        .setFooter("To add a tip use tip <matchId> <homeTeamScore> <awayTeamScore>");
    return embed;
}