const express = require('express');
const Discord = require("discord.js");
const fs = require('fs');
const commandHandler = require('./commandHandler/commandHandler');
require('dotenv').config();
const app = express();
const port = 3000;
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commandHandler/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./commandHandler/commands/${file}`);
  client.commands.set(command.name, command);
}

const startExpress = function () {
  app.get('/', (req, res) => res.send('Hello World!'));
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

const botLogin = function () {
  client.login(process.env['BOT_TOKEN']);
}

const ready = function () {
  client.on("ready", () => {
    console.log("I am ready!");
  });
}

const messageListener = function () {
  client.on("message", (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    commandHandler.handleCommand(client,command, message, args);
  });
}



module.exports = { startExpress, botLogin, ready, messageListener };