const Discord = require("discord.js");
const client = new Discord.Client();

['slash'].forEach(x => (client[x] = new Discord.Collection()));

client.login(process.env.TOKEN);

