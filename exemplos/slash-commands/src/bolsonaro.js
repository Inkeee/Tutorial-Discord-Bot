const Discord = require("discord.js");
const Canvas = require("canvas");
const Caxinha = require("caxinha");
const { parse } = require("twemoji-parser");

function isCustomEmoji(emoji) {
  return emoji.split(":").length == 1 ? false : true;
}
  
function isCustomEmoji(emoji) {
  return emoji.split(":").length == 1 ? false : true;
}
  
module.exports = {
  data: {
    name: "bolsonaro",
    description: "Faça um meme do Bolsonaro",
   	options: [
   	  {
	      name: "link", 
	      description: "envie um link para colocar na imagem",
	      type: 3,
	      required: false
  	  },
  	  {
	      name: "emoji-discord", 
	      description: "envie um emoji padrão para usar na imagem",
	      type: 3,
	      required: false
  	  },
  	  {
	      name: "emoji-personalizado", 
	      description: "envie um emoji personalizado para usar na imagem",
	      type: 3,
	      required: false
  	  },
  	  {
	      name: "user", 
	      description: "mencione alguem para para colocar na imagem",
	      type: 6,
	      required: false
  	  },
  	  {
	      name: "id", 
	      description: "Use o id de alguem para colocar na imagem",
	      type: 3,
	      required: false
  	  }
  	],
  },
  run: async (send, i) => {
    
    var options = i.data.options
    
    var find = (!options ? true : false)
    
    const embed_err = new Discord.MessageEmbed()
     .setTitle("🤔 como usar?")
     .setDescription(`**🔸 com menção\n/bolsonaro @nonô\n🔹 com emoji\n/bolsonaro 🐔\n🔸 com link\n/bolsonaro \`https://nono.imagem.png\`\n🔷 com arquivos do canal\n/bolsonaro**`)
     .setColor("RED")
    
    if(find === true) {
      
      var messages = await client.channels.cache.get(i.channel_id).messages.fetch()
    
      var lastAttach = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();

      if(!lastAttach) return await send(i, embed_err)
    
      var link = lastAttach.attachments.first().url
      
    } else {
      
      var result = options.find((o, i) => i === 0);
      
      var type = result.name;
      
      if(type === "link") {
        
        var regex = regex = /(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|png))/i

        if(!regex.exec(result.value.split(" ")[0]) ) return await send(i, embed_err)
    
        var link = result.value.split(" ")[0]
        
      } else if(type === "emoji-discord") {
      
        var emoji = result.value.split(" ")[0]
        
        try {
          var link = parse(emoji, { assetType: "png" })[0].url;
        } catch(err) {
          return await send(i, embed_err)
        }
        
      } else if(type === "emoji-personalizado") {
      
        var emojis = result.value.split(" ")[0]
        
        if(isCustomEmoji(emojis)) {
    
          var emoji = emojis.split(":")
    
          try {
            var id = client.emojis.cache.find(x => x.id === emoji[2].replace(">", "")).id
          } catch(err) {
            return await send(i, embed_err)
          }
          
        }
        
        if(!id) return await send(i, embed_err)
    
        var link = `https://cdn.discordapp.com/emojis/${id}.png`
        
      } else if(type === "id") {
        
        var user = client.users.cache.get(result.value.split(" ")[0])
        
        if(!user) return await send(i, embed_err)
        
         var link = user.displayAvatarURL({format: "png", dynamic: false, size: 1024})
         
      } else if(type === "user") {
        
        var user = client.users.cache.get(result.value)
        
        if(!user) return await send(i, embed_err)
        
        var link = user.displayAvatarURL({format: "png", dynamic: false, size: 1024})
        
      }
    
    }
  
    let image = await Caxinha.canvas.bolsonaro(link);
    
    let attachment = new Discord.MessageAttachment(image, "nonô-bolsonaro.png");

    return await send(i, { 
      content: `${client.users.cache.get(i.member.user.id)}`, 
      files: [attachment]
    })
  }
}
