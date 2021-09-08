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


  var options = i.options
  var type_command = options._subcommand; 
     
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
  
  var find = options._hoistedOptions[0]
  
  if(!find) return await i.reply({ embeds: [embed_err], ephemeral: true });

```
Para reduzir o código, ou fazendo da melhor forma, apenas mudamos o name e a imagem com os ifs e enviamos o embed com o resultado

Na variável find vemos como pega uma options dentro de outra options, 

E para enviar uma mensagem invisível, apenas ativamos o `ephemeral: true` nas options do reply 

