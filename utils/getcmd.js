var obj = {}
//criando um objeto para armazenar as informações

function cmd(client, cmd) {
  var letras = cmd.split("")
  //separando todas letras do comando
  client.commands.forEach(x => {
  //passando por todos comandos
    var find = x.config.name.split("")
    //separando cada letra do ciclo de repetição dos comandos do bot
    verify(find, letras)
    //verificando as letras do array do comando com as letras do array dos comandos do bot para buscar o mais compatível
  }) 
}

function alias(client, cmd) {
  var letras = cmd.split("")
  //fazendo igual o cmd lá em cima
  client.commands.forEach(x => {
  //também fazendo igual lá em cima só que com as aliases
    x.config.aliases.forEach(a => {
    //como as aliases são um array, precisamos fazer outro forEach para passar por todas aliases
      var find = a.split("")
      verify(find, letras)
      //verificando a aliases da mesma forma que o comando ali em cima
    })
  }) 
}

function verify(find, letras) {
  var num = 0
  //valor de compatibilidade
  letras.forEach((k, i) => {
  //forEach idiota apenas para ver o index
    if(letras[i] === find[i]) {
    // se as letras dos dos arrays na mesma posição forem iguais
      num += 1
      //ganhando um ponto de compatibilidade
    }
  })
  obj[find.join("")] = num
  // adicionando o comando e seu score
}

function getWin(obj) {
  var win = ["nome", 0]
  //array com nome e valor mais alto até o momento
  Object.entries(obj).forEach(([a, b])=> {
  //dividindo o objeto por key e value 
  // a > key = comando 
  // b > value = compatibilidade
    if(b > win[1]) win = [ a, b ]
    // se a compatibilidade dor maior que a compatibilidade do comando em win, sobrescrever com o comando novo mais compatível
  })
  return win
  // por fim, retornando o comando mais compatível
}

module.exports = {
  getWin, verify, cmd, alias, obj
}
//Exportando tudo
