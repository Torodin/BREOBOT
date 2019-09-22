module.exports = {
  name: 'server-info',
  aliases: ['server', 'info-server'],
  description: 'Muestra informacion del servidor',
  guildOnly: true,
  args: false,
  cooldown: 10,
  execute(message, args) {
    let today = new Date();
    let diff = Math.abs(message.guild.createdAt.getTime() - today.getTime());
    diff = Math.ceil(diff / (1000*60*60*24));

    message.channel.send(`Nombre servidor: ${message.guild.name}\n` +
      `Lider: ${message.guild.owner}\n` +
      `Miembros: ${message.guild.memberCount}\n` +
      `Creado hace ${diff} días`);
  },
};
