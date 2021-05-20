const fs = require("fs")
const react = JSON.parse(fs.readFileSync('./jsons/react.json', 'utf-8'));
const Discord = require("discord.js")
const client = new Discord.Client()

client.on('raw', async (p) => {
  
  if(!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(p.t)) return;
  
  let slots = Object.entries(react).map(([a, b]) => a)
  
  slots.filter(async (names) => {
  
  var result = Object.entries(react[names]).map(([a, b]) => (a.includes('emoji')) ? a : undefined).filter((x) => x !== undefined)
  
    result.forEach((x, i) => {
  
      var emoji = react[names]["emoji"+(i+1)];
      
      var role = react[names]["role"+(i+1)];
      
      var canal = react[names]["canal"];
      
      var mensagem = react[names]["mensagem"];
      
      if(p.d.emoji.name !== emoji) return;
    
      if(p.d.channel_id != canal) return;
    
      if(p.d.message_id != mensagem) return;
    
      var guild = client.guilds.cache.get(p.d.guild_id)
    
      var membro = guild.members.cache.get(p.d.user_id)
    
      if(membro.user.bot) return;
  
      if(p.t === "MESSAGE_REACTION_ADD") membro.roles.add(role)
      
      if(p.t === "MESSAGE_REACTION_REMOVE") membro.roles.remove(role)
    
    })
    
  })
  
})

client.login("seu token")
