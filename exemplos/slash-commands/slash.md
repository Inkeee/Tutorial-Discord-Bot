# Tutorial-Comandos-Slash
Nesse repositório, irei dizer um pouco sobre oque aprendi com slash commands, ensinando a fazer um handler, e alguns comandos.


```js
await client.api.applications(client.user.id).commands.post({ data: file.data })
```

Criando na aplicação, os comandos com os itens que temos dentro dos arquivos, só com isso seu comando com / já apareceria, mas daria erro pois não tem uma função de retorno.

Os comandos demoram um pouco para aparecer, tente tirar e adicionar o bot para ir mais rápido, e não se esqueça de adicionar as permissões corretas.

<img src="https://i.ibb.co/1Rj4WRx/48168050-E8-D4-4181-BF23-64539-F883025.jpg">

<img src="https://i.ibb.co/XXpgnLq/0-BA6-BC50-0135-4285-818-C-3-FDCEAAB928-E.jpg">

```js
client.ws.on('INTERACTION_CREATE', async (i) => {
    var command = slash.find(x => x.data.name === i.data.name.toLowerCase())
    if(command) command.run(client, send, i)
})
```
agora, criando a função da internação, command buscamos o comando pelo seu nome, caso encontrar o comando, ele executa com o paramentos. (Client) o seu bot, (send) função de enviar a mensagem e (i) a intenção que ele está usando.
	
```js 
data: {
   name: "say",
   description: "Faça o bot falar",
   options: [{
      name: "text", 
      description: "texto que vai na mensagem",
      type: 3,
      required: true
   }],
 },
```
name: o nome que o comando vai receber;
description: a descrição que o comando vai receber:
options: as opções que o bot vai ter ao executar o comando!

name: text 
ao usuário usar "/say" as opções que você definir ali em cima mostraram.

<img src="https://i.ibb.co/y8YtBbs/00-E853-A1-853-A-4-C81-AC9-F-A971832-E5-C82.jpg">

como na imagem mostra, o text que criamos ali.
description mostra uma descrição doque esse requerimento é, ou qualquer coisa que você queira dizer;
required, siginifica se é uma opção opcional, ou não.
type é o tipo de item que text vai ser, não lembro agora quais são mas em ações.md tem mais sobre

<img src="https://i.ibb.co/L9c9Pgn/8-D5-D274-E-EAD5-4394-BDA5-FD437-E3999-D3.jpg">

resultado final!

<img src="https://i.ibb.co/pn7YgbY/064-E2-F28-151-E-4770-9384-77-BC82-F5-DC38.jpg">

a primeira vez quando acaba de iniciar o bot da erro, ao tentar usar o comando, mas vai de segunda. 

Com esse handler você consegue fazer alguns comandos básicos, mais para frente atualizarei, quando aprender melhor sobre. Obrigado por ler até aqui. 👍
