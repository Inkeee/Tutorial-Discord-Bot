const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
var slash = [];

const arquivos = fs.readdirSync("./src/slashs").filter((file) =>
	file.endsWith(".js"));
	
client.on("ready", async () => {
  
   for (const files of arquivos) {
     
       const file = require(`./src/slashs/${files}`);
	  
	     slash.push(file)

       await client.api.applications(client.user.id).commands.post({ data: file.data })
   }
  
   client.ws.on('INTERACTION_CREATE', async (i) => {
      
      var command = slash.find(x => x.data.name === i.data.name.toLowerCase())
	    
      if(command) command.run(client, send, i)
	    
   })
	 
   async function send(interaction, content) {
      const { data, files } = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
      .resolveData().resolveFiles();
	  
      return client.api.interactions(interaction.id, interaction.token).callback.post({
         data: {
            type: 4,
	    data: { ...data, files: files }
	 }, files
      });
   }
})

client.login(process.env.TOKEN);
