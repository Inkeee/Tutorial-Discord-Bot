const Discord = require("discord.js");
const nekos = require('nekos.life');
const neko = new nekos();

module.exports = {
  data: {
    name: "ações",
    description: "faça uma ação!",
   	options: [
  	  {
	      name: "beijar", 
	      description: "beije alguem!",
	      type: 1,
	      options: [
	        {
	         name: "id", 
	         description: "procure um usuario por id",
	         type: 3,
	        },
	        {
	         name: "user", 
	         description: "procure um usuario por menção",
	         type: 6,
	        }
	      ]
  	  }, 
  	  {
	      name: "abraçar", 
	      description: "abrace alguem!",
	      type: 1,
	      options: [
	        {
	         name: "id", 
	         description: "procure um usuario por id",
	         type: 3,
	        },
	        {
	         name: "user", 
	         description: "procure um usuario por menção",
	         type: 6,
	        }
	      ]
  	  }, 
  	  {
	      name: "bater", 
	      description: "bata em alguem!",
	      type: 1,
	      options: [
	        {
	         name: "id", 
	         description: "procure um usuario por id",
	         type: 3,
	        },
	        {
	         name: "user", 
	         description: "procure um usuario por menção",
	         type: 6,
	        }
	      ]
  	  }, 
  	  {
	      name: "cafuné", 
	      description: "faça cafuné em alguem!",
	      type: 1,
	      options: [
	        {
	         name: "id", 
	         description: "procure um usuario por id",
	         type: 3,
	        },
	        {
	         name: "user", 
	         description: "procure um usuario por menção",
	         type: 6,
	        }
	      ]
  	  }, 
  	]
  },
  run: async (client, i) => {

  var options = i.options
  
  var type_command = options._subcommand; 
  
  const embed_err = new Discord.MessageEmbed()
   .setTitle(titles.COMO_USAR)
   .setDescription(`**${emojis.CUBO_LARANJA} com menção\n${emojis.CUBO_AZUL} /ações ${type_command} @nonô\n${emojis.CUBO_LARANJA} com id\n${emojis.CUBO_AZUL} /ações ${type_command} [user_id]\n${emojis.CUBO_LARANJA} Nota: Não pode ser você mesmo!**`)
   .setColor(colors.ERRO)
     
  if(type_command === "beijar") {
    var name = "beijou"
    var link = await neko.sfw.kiss()
  }
  if(type_command === "abraçar") {
    var name = "abraçou"
    var link = await neko.sfw.hug()
  }
  if(type_command === "bater") {
    var name = "bateu em"
    var link = await neko.sfw.slap()
  }
  if(type_command === "cafuné") {
    var name = "bateu em"
    var link = await neko.sfw.cuddle()
  }
  
  var find = options._hoistedOptions[0]
  
  if(!find) return await i.reply({ embeds: [embed_err], ephemeral: true });
  
  if(find.name === "id") {
    
    var user = client.users.cache.get(find.value.split(" ")[0])
      
    if(!user) return await i.reply({embeds: [embed_err], ephemeral: true });
        
  } else if(find.name === "user") {
    
    var user = client.users.cache.get(find.value)
        
    if(!user) return await i.reply({embeds: [embed_err], ephemeral: true });
      
  }
    
  if(!user) return await i.reply({embeds: [embed_err], ephemeral: true });
        
  let member = i.member.user.username
  
  let member2 = user.username
  
  if(member === member2) return await i.reply({embeds: [embed_err], ephemeral: true });
  
  const embed = new Discord.MessageEmbed()
   .setTitle(`**⭐️ ${type_command}**`)
   .setColor(colors.COMUM)
   .setDescription(`**${member} ${name} ${member2}**`)
   .setImage(link.url)
  
  return await i.reply({embeds: [embed], ephemeral: false });
      
  }
}
