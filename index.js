const Discord = require("discord.js");
const client = new Discord.Client();

['slash'].forEach(x => (client[x] = new Discord.Collection()));

client.on("ready", async () => {
  
   for (const files of arquivos) {
     
       const file = require(`../../slash/${files}`);
	  
	  client.slash.set(file.data.name, file);
	  
	  slash.push(file)
	  
       await client.api.applications(client.user.id).commands.post({ data: file.data })
   }
  
   client.ws.on('INTERACTION_CREATE', async (i) => {
      
      var command = slash.find(x => x.data.name === i.data.name.toLowerCase())
	    
      if(command) command.run(client, send, i)
	    
   })
	 
   async function send(interaction, content) {
      return client.api.interactions(interaction.id, interaction.token).callback.post({
         data: {
            type: 4,
	    data: await msg(interaction, content),
	 },
      });
   }

   async function msg(interaction, content) {
      const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
         .resolveData().resolveFiles();
	
      return { ...apiMessage.data, files: apiMessage.files };
   }

}

client.login(process.env.TOKEN);

