function permission(permissions, message) {
//permissions = permissões em um array, no caso as que estão nos comandos

  var user = [] //array de permissões de users
  var bot = [] //array de permissões do bot
  
  if(!permissions) return;

  permissions.forEach(x => {
  //forEach para separar cada permissão
    if(x.split("_")[0] === "USER") {
    //separando por _ se o array resultante tiver USER no início
      user.push(x.replace("USER_", ""))
      //adicionando na lista de permissões de user
    } else {
      bot.push(x)
      // se não adicionando nas permissões do bot
    }
  })

  var type_user = false // se deu erro nas permissões do user 
  var type_bot = false // se deu erro nas permissões do bot 
  var res = false // se deu erro no geral
  
  if(user) {
    user.forEach(x => {
      if(!message.member.permissions.has(x)) {
        type_user=true
        res=true
        //passando por todas permissões e avisando nas variáveis que algo deu errado
      }
    })
  }
  if(bot) {
    bot.forEach(x => {
      if(!message.guild.me.permissions.has(x)) {
        type_bot=1
        res=true
        //fazendo a mesma coisa que em cima
      }
    })
  }

  if(res) {
    var array = [] // array de resposta geral 
    var arr_bot = [] // array de resposta de erro em permissões do bot 
    var arr_user = [] // array de resposta de erro em permissões do user 

    if(type_bot) {
      
      bot.forEach((x, i) => {
        if(i+1 === bot.length) {
          arr_bot.push(x)
          arr_bot.push(". ")
        } else if(i+2 === bot.length) {
          arr_bot.push(x)
          arr_bot.push(" e ")
        } else {
          arr_bot.push(x)
          arr_bot.push(", ")
        }
      })
      
      array.push(`Para executar esse comando eu preciso ter as seguintes permissões: ${arr_bot.join("")}`)
      
    }
    if(type_user) {
      
      user.forEach((x, i) => {
        if(i+1 === user.length) {
          arr_user.push(x)
          arr_user.push(". ")
        } else if(i+2 === user.length) {
          arr_user.push(x)
          arr_user.push(" e ")
        } else {
          arr_user.push(x)
          arr_user.push(", ")
        }
      })
      
      if(array.length > 1) array.push("\n\n") 
      
      array.push(`Para executar esse comando você precisa ter as seguintes permissões: ${arr_user.join("")}`)
    }
     

    // os dois ifs são iguais, apenas verificam se tem uma permissão faltando, caso tenha, ele separa todas permissões de uma forma mais bonita, e junta no array de repasta geral para enviar no return
    
    return {
      err: true,
      text: array.join(" ")
    }
  }

  //caso não tenha nada, ele apenas retorna um false
  //nome está ali pq eu quero, apenas 

  return {
    err: false,
    text: "none"
  }
    
}

module.exports = { permission }

//exportando a função 
