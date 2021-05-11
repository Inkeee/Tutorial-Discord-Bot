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
retorno: 

<img src="https://i.ibb.co/dQJYCD6/BB83-DF62-F433-4445-95-D3-8-B475-B95-E5-D7.jpg">

Envio direto:

```js
 var attachment = new Discord.MessageAttachment(image, `bolsonaro.png`);
 
 return await send(i, attachment)
```

retorno que o corpo da mensagem é inválido, ou que a mensagem precisar ter conteúdo para ser enviada.

tentei alterar algumas coisas da função de envio, e os comandos pararam de responder.
a qualquer descoberta, atualizarei aqui! 
