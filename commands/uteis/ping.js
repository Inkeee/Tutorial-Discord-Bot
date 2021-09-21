
//base de um comando

const Discord = require("discord.js")

module.exports = {
  config: {
    name: "ping", //nome do comando
    aliases: ["pong"], //sinônimos do comando
    category: "Utilidades", // categoria do comando
    cooldown: 10, // tempo para acrescentar no cooldown
    permissions: [] // permissões para executar o comando!
    // nas permissões use USER_ para permissões de usuários e sem nada para permissões do bot 
    //exemplo: user - USER_MANAGE_GUILD, bot - MANAGE_GUILD
  },
  run: async (client, message, args) => {

  message.reply({content: "pong"})
  
  }
}
