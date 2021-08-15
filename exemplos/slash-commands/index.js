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
  

   client.on('interactionCreate', async (i) => {
     
      if(!i.isCommand()) return;
	 
      var command = slash.filter(x => x.data.name === i.commandName)
      
      if(command) command[0].run(client, i)

   })

})

client.login(process.env.TOKEN);
