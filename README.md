# Euro2020-Bot
The Euro2020-Bot is a discord bot which provides various commands for the football european championship 2020 which is held from 11.06.21 to the 11.07.2021. 
To get a understanding what the bot can do refer to the [Command List](#commands)

## Some Nerd Stuff
The bot is written in NodeJS. The bot also uses the [DiscordJs](https://discord.js.org/#/) module for a easier interaction with the [Discord API](https://discord.com/developers/docs/intro).
The bot is hosted on [Replit](https://replit.com/), a online IDE, editor, compiler for over 50 programming languages with a hosting option. 
To let the bot "stay awake" I'm using a third party service called [UptimeRobot](https://uptimerobot.com/), which pings the bot in a 5 min interval.
I recommend this kind of setup for everyone which want to create and host a discord bot for free.

The bot consumes the data from the [football-data API](https://www.football-data.org/).

The data will be stored in  [SQLite](https://www.sqlite.org/index.html) file. I'm also using the [Knex](https://knexjs.org/) module for sql queries. 

## Commands

| Command     | Arguments                            | Output                                                                     | 
|-------------|:------------------------------------:| ---------------------------------------------------------------------------|
|~allmatches  |                                      | delivers Id, HomeTeam and AwayTeam of all matches                          |
|~match       | matchId                              | delivers result for a specific match                                       |
|~today       |                                      | delivers matches for today                                                 |
|~tomorrow    |                                      | delivers matches for tomorrow                                              |
|~bet         |                                      | delivers all matches which can be bet on                                   |
|~bet         | matchId, homeTeamScore, awayTeamScore| adds the bet you made on a match. A confirmation message will be displayed |

