// BEFORE LAUNCH
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

// ON READY
client.on("ready", () => {
  
});

// GUILDS
client.on("guildCreate", guild => {
   
});

client.on("guildDelete", guild => {

});

// ON MESSAGE
client.on("message", async message => {
  if(message.author.bot || message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    
// UTILITY COMMANDS 
// Help  
  if(command === "help") {
    message.reply(`here is the list of commands:
\n__*Admin:*__
\n__*Moderation:*__ *(requires a moderator role)*
\n**${config.prefix}purge** - Delete between 2 and 100 messages
\n**${config.prefix}mute <rulebreaker>** - Permanently mute someone (!unmute to unmute)
\n**${config.prefix}kick <rulebreaker>** - Kick an annoying person from the server
\n**${config.prefix}ban <rulebreaker>** - Ban a randie
\n__*Fun:*__
\n**${config.prefix}say** - The bot parrots what you type
\n**${config.prefix}roll** <# of sides> - Roll a die!
\n**${config.prefix}ping** - Calculates latency
\n**${config.prefix}flip** - Flip a coin - *coming soon*
\n__*Clans:*__
\n**${config.prefix}iw** <rarity color> <drop> <length (minutes)> - posts an Iron Wizard log in the specified events channel
\n**${config.prefix}sk** <rarity color> <drop> <length (minutes)> - posts a Skeleton King log in the specified events channel
\n**${config.prefix}cp** <rarity color> <drop> <length (minutes)> - posts a Capture Point log in the specified events channel
\n**${config.prefix}uc** <length (minutes)> - posts an Undead City log in the specified events channel`);
}
  
// Ping
if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
}
    
 // ADMIN COMMANDS
 
    
 // MODERATOR COMMANDS
if(message.member.hasPermission("KICK_MEMBERS")) {
  
     // Mute
     if(command === "mute") {
       
         if(!message.guild.roles.find("name", "Muted")) {
           message.guild.createRole({
             name: 'Muted',
             color: '0xb51515',
             hoist: false,
             mentionable: false,
             permissions: [
               {
                 SEND_MESSAGES: false,
               }
             ]   
           });
           message.channel.send("Because there was no `muted` role, I've gone ahead and created one for you.");
         }
       
         let rb = message.mentions.members.first();
         let roleID = message.guild.roles.find("name", "Muted").id;
  
       
         if(message.author.id === rb.id) {
             message.reply("YOU'RE FUCKING RETARDED");
         } else if(rb.roles.find("name", "Muted")) {
             message.reply(rb + " is already muted you mormon.");
         } else {
             message.reply(rb + " has been muted.");
             rb.addRole(roleID);
         }
     }
  
     // Unmute
     if(command === "unmute") {
         let rb = message.mentions.members.first();
         let roleID = message.guild.roles.find("name", "Muted").id;
      
         if(message.author.id === rb.id) {
             message.reply("if you were muted you wouldnt be able to type this command. And if you are muted but CAN TYPE, then you're ADMIN and you can LITERALLY EDIT YOUR ROLES");
         } else if(!rb.roles.find("name", "Muted")) {
             message.reply(rb + " isn't even muted you mormon.");
         } else {
             message.reply(rb + " has been unmuted.");
             rb.removeRole(roleID);
         }
     }
     
     // Purge
     if(command === "purge") {
         const deleteCount = parseInt(args[0], 10);
         
         if(!deleteCount || deleteCount < 2 || deleteCount > 100)
         return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
         const fetched = await message.channel.fetchMessages({limit: deleteCount});
         message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
     }
}


 // CLANS COMMANDS
 if(message.member.roles.has(459896776174993409)) {
     
     // Iron Wizard Log
     if(command === "iw") {
         let rarity = args[0];
         let drop = args[1];
         let time = args[2];
      
         let color;
         if(rarity === "red") {
             color = config.red;
         } if(rarity === "blue") {
             color = config.blue;
         } if(rarity === "white") {
             color = config.white;
         } if(rarity === "gold") {
             color = config.gold;
         }
       
         const dropUp = drop.charAt(0).toUpperCase() + drop.slice(1);
      
         const embed = new Discord.RichEmbed()
           .setTitle("**Iron Wizard**")
           .setAuthor(`Logged by ${message.author.username}`)
           .setColor(color)
           .setFooter("The mighty Iron Wizard has fallen!")
           .setTimestamp()
           .addField("Drop", `${dropUp}`)
           .addField("Length", `${time} minutes`);
        client.channels.get(config.logChannel).send({embed});
     
        message.channel.send("Sucessfully logged.");
     }
     
     // Skeleton King Log
     if(command === "sk") {
         let rarity = args[0];
         let drop = args[1];
         let time = args[2];
      
         let color;
         if(rarity === "red") {
             color = config.red;
         } if(rarity === "blue") {
             color = config.blue;
         } if(rarity === "white") {
             color = config.white;
         } if(rarity === "gold") {
             color = config.gold;
         }
       
         const dropUp = drop.charAt(0).toUpperCase() + drop.slice(1);
      
         const embed = new Discord.RichEmbed()
           .setTitle("**Skeleton King**")
           .setAuthor(`Logged by ${message.author.username}`)
           .setColor(color)
           .setFooter("The demonic Skeleton King has been slain!")
           .setTimestamp()
           .addField("Drop", `${dropUp}`)
           .addField("Length", `${time} minutes`);
        client.channels.get(config.logChannel).send({embed});
     
        message.channel.send("Sucessfully logged.");
     }
   
     // Capture Point Log
     if(command === "cp") {
         let rarity = args[0];
         let drop = args[1];
         let time = args[2];
      
      
         let color;
         if(rarity === "gray") {
            color = config.gray;
         } if(rarity === "purple") {
            color = config.purple;
         }

         const dropUp = drop.charAt(0).toUpperCase() + drop.slice(1);
      
         const embed = new Discord.RichEmbed()
           .setTitle("**Capture Point**")
           .setAuthor(`Logged by ${message.author.username}`)
           .setColor(color)
           .setFooter(`${message.author.username} has captured the point!`)
           .setTimestamp()
           .addField("Drop", `${dropUp}`)
           .addField("Length", `${time} minutes`);
         client.channels.get(config.logChannel).send({embed});
     
         message.channel.send("Sucessfully logged.");
     }
     
     // Undead City Log
     if(command === "uc") {
         let time = args[0];
      
         const embed = new Discord.RichEmbed()
           .setTitle("**Undead City**")
           .setAuthor(`Logged by ${message.author.username}`)
           .setColor()
           .setFooter("All the chests have been looted!")
           .setTimestamp()
           .addField("Length", `${time} minutes`);
        client.channels.get(config.logChannel).send({embed});
     
        message.channel.send("Sucessfully logged.");
     }
 }
    
 // FUN COMMANDS
 //if filler
    
     // Spam Blue
     if(command === "blue") {
         message.channel.send("<@219506178680553473>");
         message.channel.send("<@219506178680553473>");
         message.channel.send("<@219506178680553473>");
         message.channel.send("<@219506178680553473>");
     }
    
     // Spam Coco
     if(command === "coco") {
         message.channel.send("<@280841703504478208>");
         message.channel.send("<@280841703504478208>");
         message.channel.send("<@280841703504478208>");
         message.channel.send("<@280841703504478208>");
     }
    
     // Spam Eva
     if(command === "eva") {
         message.channel.send("<@148268483723919360>");
         message.channel.send("<@148268483723919360>");
         message.channel.send("<@148268483723919360>");
         message.channel.send("<@148268483723919360>");
     }
  
     // Dice
     if(command === "roll") {
         const roll = Math.floor(Math.random() * 6) + 1;
         message.channel.send("🔹      |   **Rolling**...   |      🔹\n**==================**\n➡️ | 🎲⚫️⚫️⚫️⚫  | ⬅️")
             .then((msg)=>{setTimeout(function() {
             {setTimeout(function() {
             {setTimeout(function() {
             {setTimeout(function() {
             {setTimeout(function() {
             msg.edit("🔹      |     **Rolled**     |      🔹\n**==================**\n➡️      |   ➖ **" + roll + "** ➖   |     ⬅️");
             }, 1000)}
             msg.edit("🔹      |   **Rolling**...   |      🔹\n**==================**\n➡️ | ⚫⚫⚫⚫🎲  | ⬅️");
             }, 1000)}
             msg.edit("🔹      |   **Rolling**...   |      🔹\n**==================**\n➡️ | ⚫⚫⚫🎲⚫️  | ⬅️");
             }, 1000)}
             msg.edit("🔹      |   **Rolling**...   |      🔹\n**==================**\n➡️ | ⚫⚫🎲⚫️⚫  | ⬅️");
             }, 1000)}
             msg.edit("🔹      |   **Rolling**...   |      🔹\n**==================**\n➡️ | ⚫🎲⚫️⚫️⚫️  | ⬅️");
             }, 1000)});
     }
    
     // Say
     if(command === "say") {
         const sayMessage = args.join(" ");
         message.delete().catch(O_o=>{}); 
         message.channel.send(sayMessage);
     }
  //filler
});

// Token from Heroku
client.login(process.env.BOT_TOKEN);
