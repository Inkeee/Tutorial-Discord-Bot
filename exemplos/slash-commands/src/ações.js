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
  run: async (client, send, i) => {

  var options = i.data.options
  var result = options.find((o, i) => i === 0);
  
  var type_command = result.name;
      
  const embed_err = new Discord.MessageEmbed()
   .setTitle("🤔 como usar?")
   .setDescription(`**🔸 com menção\n/ações ${type_command} @nonô\n🔹 com id\n/ações ${type_command} [user_id]\nNota: Não pode ser você mesmo!**`)
   .setColor("RED")
     
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
    
  var data = i.data.options[0].options
  
  if(!data) return await send(i, embed_err)
  
  var find = data.find((o, i) => i === 0);
    
  if(find.name === "id") {
    
    var user = client.users.cache.get(find.value.split(" ")[0])
      
    if(!user) return await send(i, embed_err)
        
  } else if(find.name === "user") {
    
    var user = client.users.cache.get(find.value)
        
    if(!user) return await send(i, embed_err)
      
  }
    
  if(!user) return await send(i, embed_err)
      
  let member = i.member.user.username
  
  let member2 = user.username
  
  if(member === member2) return await send(i, embed_err)
      
  const embed = new Discord.MessageEmbed()
   .setTitle(`**⭐️ ${type_command}**`)
   .setColor("#bbe6f9")
   .setDescription(`**${member} ${name} ${member2}**`)
   .setImage(link.url)
  
  return await send(i, embed)
      
  }
}
