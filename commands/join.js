module.exports = {
  name: 'join',
  aliases: ['connect', 'enter'],
  description: 'Conecta el bot a un canal, al del usuario si no se especifica',
  guildOnly: true,
  args: false,
  usage: '[nombre canal]',
  cooldown: 10,
  execute(message, args) {
    const { voiceChannel } = message.member;

    if(!voiceChannel) return message.reply('Tienes que estar en un canal de voz!');

    voiceChannel.join()
      .then(connection => console.log('Connected!'))
      .catch(console.error);
  },
};
