O comando de ações 🐔, eu iria fazer um de hug apenas para mostrar como funciona as menções, mas aprendi a fazer subcomandos, então adicionei essa funcionalidade nesse tutorial.

A base de um subcomando, é apenas mais options dentro das options em type 1

```js
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
      description: "de um abraço!",
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
   }
]
```

A divisão de um slash command em sub grupos/comandos é até bem simples!
Ela consiste apenas em você criar options dentro de options

type 2 = subgrupo
type 1 = subComando

Pense como um json bosta 🤡, mas no exemplo abaixo você pode começar direto na categoria economia por exemplo, não precisa ter um subgrupo para fazer subcomandos!

```json 
Comandos: {
  type: 2
  Economia: {
     type: 1
     Daily: { 
     }
     Coins: {
     }
     Work: {
     }
  }
  Diversao: {
     type: 1
     Beijar: {
     }
     Abracar: {
     }
     Tapa: {
     }
  }
}
```


Subgrupo é chato 👍, são muitas possibilidades em um comando só, fica enorme, então só recomendo fazer type 1 que são sub comandos.


type 6 significa menção, não tem oque explicar também sobre as menções, ela retorna um id, 
type 3 significa string
required nas options são options necessárias, em sub comando não é muito bom ativar.

```js

  var options = i.data.options
  var result = options.find((o, i) => i === 0);

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
```

agora, parece apenas um comando normal, mas basicamente antes buscávamos as options para coletar as informações que vai usar, agora ela não retorna mais só as informações, retorna o subcomando que foi usado, então procuramos com ifs para ver qual imagem usar no comando.
Lembrando, isso só vale para comandos simples, que tem poucas mudanças, se você fazer um comando com categoria canvas por exemplo, você tem que fazer cada comando dentro desses ifs, mas como esse comando só muda a imagem e a palavra no meio, eu apenas defini qual usar-las dentro desses ifs, para não prolongar o código, fazer cada comando dentro do if ficaria a mesma coisa, mas quando der tenta não fazer isso, fica muito grande. Mas tem casos que vão precisar ser feito!

```js
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
```


