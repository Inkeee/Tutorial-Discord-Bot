Bem, reactions roles são bem simples de se fazer, você precisa aprender saber a mexer com objetos.

E para o auxílio de vocês, ensinarem tudo que precisar entender para fazer um reaction role, na verdade um não, varios!

para começar, jsons, utilizaremos jsons para não necessitar de banco de dados externos, nesse comando recomendo usar o firebase para conseguir fazer algo parecido, pois outros databases podem não funcionar como no firebase.

- firebase apenas para quem deseja fazer um reaction role configurável.

raw retorna um objeto, e esse objeto tem tudo que precisamos: 

<img src="https://i.ibb.co/jyzd44m/42085-AF6-9-CFD-4-ABB-97-A3-CF1-BF14865-D5.jpg">

```js
const fs = require("fs");
const react = JSON.parse(fs.readFileSync('./react.json', 'utf-8'));
```
Nesse json que puxamos, terá todas informações que usaremos, a estrutura do json será:

```json
{
  "react1": {
    "emoji1": "👍",
    "emoji2": "🥸",
    "canal": "844787535333949501",
    "role1": "844416225630748702",
    "role2": "844416390668484609",
    "mensagem": "844787829091336204"
  },
  "react2": {
    "emoji1": "🐔",
    "emoji2": "🤡",
    "canal": "844787535333949501",
    "role1": "844414135202611221",
    "role2": "844416103173455882",
    "mensagem": "844789255133724692"
  }
}
```

Sempre, terá que ter essas informações:
canal = id do canal que a mensagem está!
mensagem = id da mensagem que vai coletar as reações
emoji1 = primeiro emoji a ser usado (emoji direto, apenas emojis padrões)
role1 = primeiro cargo a ser usado (id do cargo)

emoji1 = role1,
emoji2 = role2.

E assim até o infinito, sempre começa no 1, e não pode pular números.


você pode setar quantos objetos quiser no json, um objeto para cada mensagem, se quiser fazer 10 objetos para 10 mensagem e 1 cargo para cada você pode que não vai dar erro, ou também, pode colocar 1 objetos com as 10 reações, mas isso limitaria a mensagem para apenas uma!
então, isso vai da criatividade de cada um.

Nota: não abuse de colocar 20 cargos em uma mensagem só, quanto mais você colocar mais pode demorar, para enviar isso, coloque sempre 5/8 reações por mensagem, para ficar um número legal, que envia lag, e funciona direitinho.

```js

 if(!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(p.t)) return;
  
 let slots = Object.entries(react).map(([a, b]) => a)
  
```

O primeiro if apenas bloqueia outros eventos, pois o raw emite tudo que acontece nos servidores do client, então ele limita apenas paras os eventos de adicionar reações e remover reações.

slots, Objetc.entries(react) organiza em pares um objeto em um array. map, pega o par [a, b] e pega a:

json1: {
  name: a, 
  num: 1
}

no map, os parâmetros sigunificariam:

a = json1 
b = { name: a, num: 1 }

então salvamos todos nomes, basicamente, para usar-los, sem precisar escrever-los 

```js
slots.filter(async (names) => {
var result = Object.entries(react[names]).map(([a, b]) => (a.includes('emoji')) ? a : undefined).filter((x) => x !== undefined)
})
```
filtramos todos nomes que tem no json, e result é a busca pelo número de emojis que existem em cada objeto dentro do json 

fazemos a mesma coisa que fizamos anteriormente, só que usamos o objeto que estava no valor dos nomes que coletamos 🐔

Antes:
json1: {
  name: a, 
  num: 1
}
Depois: 
{
  name: a, 
  num: 1
}
Isso apenas para fazermos outro mapa, verificando quantos emojis temos em cada objeto do json, se você der console.log retornará todos emojis que você colocou no json

```js
result.forEach((x, i) => {
  var emoji = react[names]["emoji"+(i+1)];
  var role = react[names]["role"+(i+1)];
  var canal = react[names]["canal"];
  var mensagem = react[names]["mensagem"];
      
  if(p.d.emoji.name !== emoji) return;
  if(p.d.channel_id != canal) return;
  if(p.d.message_id != mensagem) return;
    
  var guild = client.guilds.cache.get(p.d.guild_id)
  var membro = guild.members.cache.get(p.d.user_id)
    
  if(membro.user.bot) return;
  
  if(p.t === "MESSAGE_REACTION_ADD") membro.roles.add(role)
      
  if(p.t === "MESSAGE_REACTION_REMOVE") membro.roles.remove(role)
    
})```


um for each, com todos emojis, apenas para descobrimos qual cargo ele quer receber ou remover,
i é a posição do emoji no map que criamos, então se na lista tem 10 emojis, o for each vai tentar 10 vezes

como o cargo sempre é a mesma posição do emoji, apenas descobrindo o emoji, ja sabermos o cargo também.


o for each vai rodar 10 vezes no exemplo de 10, então ele tentará emoji1, emoji2, emoji3... até encontrar a opções que encaixa e quando encontrar eles apenas verifica se foi um evento de add ou remove, e leva o resultado que queremos:

sem cargo:
<img src="https://i.ibb.co/8sTG5LJ/9-C1-BE800-D8-DD-48-F1-8079-CFBEF39-AE16-E.jpg">

resultado:
<img src="https://i.ibb.co/JcTmq2f/C792-B8-E9-CA5-E-4-AAE-9-BDE-05776-A35-F369.jpg">

com cargos:
<img src="https://i.ibb.co/qCrKSmp/4-C188599-90-B1-4699-A030-1-D7-E377-A9-BB1.jpg">
