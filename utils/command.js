const fs = require("fs")

function setCommands(client) {
  
  const load = dirs => {
  //função que usa uma pasta como parâmetro

    const commands = fs.readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    //usando a pasta para pegar os comandos

    for (let file of commands) {
    //passando por todos arquivos

      const comando = require(`../commands/${dirs}/${file}`);
      //requerindo o comando exportado na pasta de comandos

      client.commands.set(comando.config.name, comando);
      if (comando.config.aliases) comando.config.aliases.forEach(a => client.aliases.set(a, comando.config.name));
      //setando os comandos nas coleções 
    };
  };
  
  fs.readdirSync(`./commands/`).forEach(x => load(x));
  //executando a função com as pastas como paramento
}

module.exports = { setCommands }
//exportado para usar na index
