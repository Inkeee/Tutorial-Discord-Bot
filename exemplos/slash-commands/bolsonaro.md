No comando bolsonaro, não está pegando ainda, mas você que se interessa pode tentar, falta algo ainda no envio de attachments, e não consigui fazer pegar ainda, então enquanto não consegui fazer, deixarei esse comando como molde para vocês tentarem.

Nesse exemplo usei a npm Caxinha, muito boa aliás, mas você pode usar o canvas direto para fazer no lugar, só usar a variável "link" que ela retorna a imagem que o usuário enviou.

algumas das formas que tentei enviar:

Por embed: 

```js
 var attachment = new Discord.MessageAttachment(image, `bolsonaro.png`);
  
 const embed = new Discord.MessageEmbed()
  .setDescription("meme do bolsonaro")
  .attachFiles([attachment])
  .setImage(`attachment://bolsonaro.png`)
    
 return await send(i, embed)
```

Envio direto:

```js
 var attachment = new Discord.MessageAttachment(image, `bolsonaro.png`);
 
 return await send(i, { 
    content: `${client.users.cache.get(i.member.user.id)}`, 
    files: [attachment]
 })
```

Não adianta tentar tirar o content do envio direto, ele da erro sem, e para não colocar algo aleatório, coloquei a menção do usuário, você pode colocar qualquer string ali que vai pegar, caso você pegou o código antigo, antes de eu arrumar esse comando, troque a função send da index, modifiquei um pouco (foi difícil arrumar) mas agora ela pega.
Novos comandos viram, como o de Hug, um exemplo de uso de menção. 


Não vou explicar muito como coleta as imagens, porque é apenas coisas bestas, que dá para descobrir na net.

Não ligue para quantidade de try, mas se tirar da erro, pois sempre pode ser um emoji inválido, ou qualquer outra coisa.
