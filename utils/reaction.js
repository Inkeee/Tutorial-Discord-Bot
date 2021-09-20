function reaction(p, client, react) {
  
  if(!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(p.t)) return;
  //coletando apenas os eventos que queremos

  let slots = Object.keys(react)
  //separando os nomes dos reactions roles

  slots.filter(async (names) => {
  //filtrando
  var result = Object.entries(react[names]).map(([a, b]) => (a.includes('emoji')) ? a : undefined).filter((x) => x !== undefined)
  //pegando o um reaction role pelo nome, mapeando pelos emojis para usar a índex para pegar o emoji e o cargo

    result.forEach((x, i) => {
    //forEach para verificar qual reação é 

      var emoji = react[names]["emoji"+(i+1)];
      //pegando emoji
      var role = react[names]["role"+(i+1)];
      //pegando o cargo
      var canal = react[names]["canal"];
      //pegando o canal
      var mensagem = react[names]["mensagem"];
      //pegando a mensagem
      if(p.d.emoji.name !== emoji) return;
      //se for diferente do emoji, não é oque queremos
      if(p.d.channel_id != canal) return;
      // se for em um canal diferente também não é oque queremos
      if(p.d.message_id != mensagem) return;
      // se não for na mensagem que queremos também não é oque queremos
      var guild = client.guilds.cache.get(p.d.guild_id)
      //caso tudo der certo, pegando o servidor
      var membro = guild.members.cache.get(p.d.user_id)
      //pegando o membro
      if(membro.user.bot) return;
      //se for um bot, não dar um cargo
      if(p.t === "MESSAGE_REACTION_ADD") membro.roles.add(role)
      //se for adição, dar o cargo
      if(p.t === "MESSAGE_REACTION_REMOVE") membro.roles.remove(role)
      // se for remoção, remover o cargo
    })
  })
}

module.exports = { reaction }
