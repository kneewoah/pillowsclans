const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    client.user.setActivity("Game"); 
    client.user.setStatus("dnd");
    console.log("I am ready!");
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
