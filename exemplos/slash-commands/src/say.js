module.exports = {
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
  run: async (client, send, i) => {
    
    var args = i.data.options
    
    var texto = args.find(args => args.name.toLowerCase() === "text").value;
	  
    await send(i, texto)
    
  }
}
