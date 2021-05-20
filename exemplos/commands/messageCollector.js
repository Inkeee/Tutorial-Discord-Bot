const Discord = require("discord.js");

module.exports.run = async (client, message, args, database) => {

   var ref = database.ref(`sobre/${message.author.id}`)

   var db = await ref.once("value")

   const filtro = m => m.author.id === message.author.id
    
   const coletor = new Discord.MessageCollector(message.channel, filtro, {max: 50, time: 1000 * 300,})

   var num = 1

   const embedname = new Discord.MessageEmbed()
    .setDescription(`${message.author} qual é seu nome?`)
    .setColor('BBE6F9');

   const embedidade = new Discord.MessageEmbed()
    .setDescription(`${message.author} qual é sua idade?`)
    .setColor('BBE6F9');

   const embeddesc = new Discord.MessageEmbed()
    .setDescription(`${message.author} conte um pouco sobre você!`)
    .setColor('BBE6F9');

   const embednasc = new Discord.MessageEmbed()
    .setDescription(`${message.author} qual é seja data de nascimento?`)
    .setColor('BBE6F9');

   const embederr = new Discord.MessageEmbed()
    .setDescription(`${message.author} algo deu errado, tente novamente!`)
    .setColor('RED')

   const embedcancel = new Discord.MessageEmbed()
    .setDescription(`${message.author} cancelando!`)
    .setColor('RED')

   message.channel.send(embedname)

   coletor.on('collect', async m => {

      if(num === false) return;

      if(m.content.toLowerCase() === "cancelar" || m.content.toLowerCase() === "cancel") {
         num = false
         ref.remove()
         return message.channel.send(embedcancel)
      }
      if(num === 1) {
         num = 2
         ref.set({name: m.content, id: message.author.id})
         return message.channel.send(embedidade)
      }
      if(num === 2) {
         if(isNaN(parseInt(m.content))) return  message.channel.send(embederr)
         ref.update({idade: m.content})
         num = 3
         return message.channel.send(embeddesc)
      } 
      if(num === 3) {
         ref.update({desc: m.content})
         num = 4
         return message.channel.send(embedniver)
      }
      if(num === 4) {
         ref.update({niver: m.content})
         num = 5
         return message.channel.send("deseja enviar mesmo? (sim/s/yes/y) ou cancel para cancelar")
      }
      if(num === 5) {
         if(m.content === "y" || m.content === "yes" || m.content === "sim" || m.content === "s")  {   
            ref.once("value").then(function (dba) {
              const fim = `nome: ${dba.val().name}\nidade: ${dba.val().idade}\ndescricão: ${dba.val().desc}\nuser: ${message.author}\nnascimento: ${dba.val().niver}`
              num = false
              return message.channel.send("enviado")
            })
         } else if(m.content !== "cancel") {
            return message.channel.send(embederr)
         }
      }
   })
}
