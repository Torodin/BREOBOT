module.exports = {
  name: 'voice-command',
  aliases: ['voicomm, ok-breo'],
  description: 'Activa el reconocimiento de comandos por voz',
  guildOnly: true,
  args: false,
  cooldown: 5,
  execute(message, args) {
    const { voiceChannel } = message.member;

    if (!voiceChannel) return message.reply('Tienes que estar en un canal de voz!');

    const voiceChannelBot = message.client.voiceConnections
      .get(message.guild);

    console.log(`Us: ${voiceChannel}\nBot: ${voiceChannelBot}`)
    if (!voiceChannelBot || voiceChannel.id != voiceChannelBot.id) return message.reply('El bot no está conectado a tu mismo canal!');

    let stream = voiceChannelBot.createReceiver()
      .then(console.log('Recibiendo audio'));
  },
};
