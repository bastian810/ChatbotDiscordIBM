const Discord = require('discord.js'); // Discord.JS para trabajar con discord
const request = require('request'); // Request facilita el trabajo con APIs

const client = new Discord.Client(); // Nuevo cliente de discord
const prefix = "!" // Prefix para los comandos.

// Información requerida para conectar y realizar consultas con la API de IBM.
let username = "user";
let password = "password";
let url = "Url Wordspress IBM";
let auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

// Conectar a discord.
// Discord.js nos abstrae de todo el proceso complicado y lo reduce a sólo requerir el token para conectarnos.
client.login('Token Discord');

// Cuando el bot logre conectarse, avisará en la consola.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
}); 

// Una vez conectado, comenzará a recibir los mensajes, hasta que por alguna razón se desconecte.
client.on('message', message => {
  if (message.author.bot) return undefined; // Evitamos que reciba comandos desde otros bots.

  let msg = message.content.toLocaleLowerCase(); // Convierte los mensajes recibidos a letras minusculas.

  // Nuestro único comando.
  if (msg) {

    //let text = args.join(' '); // Espacio entre los argumentos.

    console.log(message.author.username + " : " + msg);
    
    // Realizar la consulta a la API con la información obtenida previamente.
    request({
      url: url,
      method: "POST",
      headers: {
        "Authorization" : auth,
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify({
        'input': {
          'text': msg
        },
        'alternate_intents': false
      })
    }, function (error, response, body) {
      let json = JSON.parse(body); // Recibir la respuesta de la api en formato JSON.
      message.reply(json.output.text); // Enviar la respuesta de la api al chat de discord.
      console.log("Bot : " + json.output.text);
    })

   
  }
});
