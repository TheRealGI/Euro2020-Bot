const tipService = require('../../service/tip-service');
const userService = require('../../service/user-service');
const Discord = require("discord.js");
module.exports = {
    name: 'betranking',
    needsArgs: false,
    async execute(message, args) {
        let userDto = {userId: message.author.id, serverId: message.guild.id};
         let sucessfullUpdated = await tipService.updateRanking();
         if(!sucessfullUpdated) {
             return message.channel.send(`${userDto.userId}, there was a error updating the ranking. please try again later`);
         }

         let tipRanking = await userService.getTipRankingsByServer(userDto.serverId);
         let embed = await buildMessage(tipRanking, userDto);

        return message.channel.send(embed);
    }
}

 async function  buildMessage(rankings, userDto) {
    let rankNr = 1;
    let msg = "```Rank\xa0\xa0Points\t\tUsername\n";
    rankings.map(x => {
        msg += "\xa0"+rankNr+"\t\xa0\xa0\xa0"+x.Score+"\t\t\xa0\xa0"+x.UserName+"\n";
        rankNr ++;
    });

    let author = await userService.getUserById(userDto);
    let displayAuthorScore = author.length > 0 ? author[0].Score : "n/a"
    msg+="-----------------------------\n You\t\xa0"+displayAuthorScore+ "```";
    
    let embed = new Discord.MessageEmbed()
        .setColor(0x5ee59d)
        .addField('Top 10 bettor Euro 2020:', msg)
        .setFooter('To show up in the rankings you need to have made at least one bet');
    return embed;
}