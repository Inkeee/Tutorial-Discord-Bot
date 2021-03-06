const express = require('express');
const Discord = require("discord.js")
const intents = new Discord.Intents(32767); //definindo todas intents
const client = new Discord.Client({ intents });
const { obj, cmd, alias, getWin, verify } = require("./utils/getcmd.js"); //pegando as funções para descobrir os comandos digitados errados
const { reaction } = require("./utils/reaction.js"); //pegando as funções para o reaction role
const react = require("./utils/react.json");//pegando as informações do reaction role 
['commands', 'aliases', 'slash', 'events'].forEach(x => (client[x] = new Discord.Collection())); // criando as coleções que usaremos

const { setCommands } = require("./utils/slash.js") //pegando a função de setar os comandos na coleção de comandos

const { loadSlash } = require("./utils/command.js") //pegando a função dos slashs
const { permission } = require("./utils/permissions.js") //pegando a função de verificar permissões

const app = express();

app.get('/', (req, res) => {
  res.send('Oi, Casada?')
});

app.listen(3000, () => {
  console.log('Servidor Online');
});

client.on("ready", () => {
  console.log("Bot online")
  setCommands(client)
  loadSlash(client)
})

client.on('raw', async (p) => {
  reaction(p, client, react) 
})

client.on("messageCreate", (message) => {
 
  var prefix = "!"; //prefixo padrão
  
  if (message.author.bot || message.channel.type === 'dm' || !message.content.toLowerCase().startsWith(prefix)) return; //recusando mensagens que sejam por bots, dm ou não tenham o prefixo no começo 
  
  var messageArray = message.content.split(' ');
  //separando todo conteúdo da mensagem 
  var command = (messageArray[0]) ? messageArray[0].toLowerCase() : messageArray[0]
  //pegando apenas a primeira palavra da mensagem para descobrir o comando
  var args = messageArray.slice(1);
  //separado os outros conteúdos para usar nos comandos
  var arquivocmd = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length))) 
  //pegando o comando na coleção de comandos
  if(!command) return;
  
  if(!arquivocmd) {
    // se não ter um comando na coleção
    cmd(client, command.slice(prefix.length));
    //Verificando os names dos comandos
    alias(client, command.slice(prefix.length));
    //verificando as alias dos comandos
    return message.reply({content: `**Você esta tentando dizer ${getWin(obj)[0]}?**` });
    //enviando o melhor resultado 
  }

  var perm = permission(arquivocmd.config.permissions, message)
  //executando a função 
  if(perm.err) return message.reply({ content: `**${perm.text}**`,  allowedMentions: { repliedUser: false }}) 
  //caso retorne true, ele responde com todas permissões necessárias
  arquivocmd.run(client, message, args);
  //executando o comando
})

client.login("SEU_TOKEN")
