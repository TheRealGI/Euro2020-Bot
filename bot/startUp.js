const express = require('express');
const Discord = require("discord.js");
const app = express();
const port = 3000;
const client = new Discord.Client();

const startExpress = function(){
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

const botLogin = function(){
  client.login(process.env['BOT_TOKEN']);
}

const ready = function(){
    client.on("ready", () => {
    console.log("I am ready!");
});
}

const messageListener = function(){
  client.on("message", (message) => {

if(message.content == "ping")
{
  message.channel.send("pong");
}
});
}



module.exports = {express, botLogin, ready, messageListener};