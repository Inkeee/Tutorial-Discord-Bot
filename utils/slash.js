const fs = require("fs");

async function loadSlash(client) { 

  var slash = [] //array de comandos em slash 
  //você pode optar por salvar em uma coleção

  const arquivos = fs.readdirSync("./slashs").filter((file) =>
	file.endsWith(".js"));
  //pegando os comandos na pasta de slash

  for (const files of arquivos) {

      const file = require(`./slashs/${files}`);
	  
      slash.push(file)

      await client.api.applications(client.user.id).commands.post({ data: file.data })

   }
   //fazendo a mesma coisa que o handler de comandos normal do repositório, só que salvando no array no lugar da coleção
  
   client.on('interactionCreate', async (i) => {
   //ativando evento de slash 
      if(!i.isCommand()) return;
      //se não for um comando, ele retorna
      var command = slash.filter(x => x.data.name === i.commandName)
      //buscando o comando que foi requisitado
      if(command) command[0].run(client, i)
      //executando comando
   })

}

module.exports = { loadSlash }
