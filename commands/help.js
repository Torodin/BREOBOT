require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'Lista de todos los comando o uno en especifico.',
	aliases: ['commands'],
	usage: '[nombre comando]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Lista de todos los comandos:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nPuedes utilizar \`${prefix}help [nombre comando]\` para mostrar informacion de ese comando en especifico!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Te he enviado un mensaje privado con los comandos!');
				})
				.catch(error => {
					console.error(`No se pudo enviar mensaje privado a ${message.author.tag}.\n`, error);
					message.reply('Parece que no puedo enviarte mensajes privados!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('No es un comando valido!');
		}

		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripcion:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

		message.channel.send(data, { split: true });
	},
};
