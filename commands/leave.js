module.exports = {
  name: 'leave',
  aliases: ['exit','disconnect'],
  description: 'Desconecta el bot del canal en el que este',
  guildOnly: true,
  args: false,
  cooldown: 10,
  execute(message, args) {
    const { voiceChannel } = message.member;

    if (!voiceChannel || !voiceChannel.connection) {
      return message.reply('Tienes que estar conectado al mismo canal que el bot!');
    }

    voiceChannel.leave();
  },
};
