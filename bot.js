//Cargamos las librerias necesaria y cargamos la configuración del bot
const fs = require('fs');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

//Abrimos sesión en discord y creamos una coleccion vacia para los comandos
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Buscamos y cargamos los ficheros con los comandos
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file != 'plantilla.js');

//Cargamos los comandos en la variable 'commands' desde su fichero
console.log('--------Cargando comandos--------');
var errCarga = 0;
for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
    console.log(`${command.name} cargado`);
  } catch (error) {
    console.error(`Imposible cargar ${file}: ${error}`);
    errCarga++;
  }
}
console.log(`---Comandos cargados ERRORES ${errCarga}---`);

const cooldowns = new Discord.Collection();

//Confirmamos que se conectó
client.once('ready', () => {
  console.log('Ready!');
});

//Manejo de los comandos
client.on('message', message => {
  //Comprobamos si es un comando o un mensaje normal
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  console.log(`Comando: ${message}`);

  //Separamos argumentos del nombre de comando
  const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  //Comprovamos si existe el comando y lo guardamos
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

  //Comprovamos si es de guild
  if (command.guildOnly && !message.guild) {
    return message.reply(`No puedo ejecutar este comando en los chats privados!`);
  }

  //Control de cooldowns
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Espera ${timeLeft.toFixed(1)} segundo(s) mas para usar el comando \`${command.name}\``)
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  //Si necesita argumentos los comprovamos
  if (command.args && !args.lenght) {
    let reply = `No has pasado ningun argumento, ${message.author}!`;

    if (command.usage) {
      reply += `\nEl uso correcto seria: \`${prefix}${command.name}${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  //Intentamos ejecutar el comando
  try {
    command.execute(message,args);
  } catch (error) {
    console.error(error);
    message.reply('Error al intentar ejecutar el comando!')
  }
});

//Login
client.login(token);
