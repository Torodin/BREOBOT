module.exports = {
  name: 'leave',
  aliases: ['exit','disconnect'],
  description: 'Desconecta el bot del canal en el que este',
  guildOnly: true,
  args: false,
  cooldown: 10,
  execute(message, args) {
    const { voiceChannel } = message.member;
    const voiceConnectionBot = message.client.voiceConnections
      .filter(voiceConnection => voiceConnection.channel.guild == message.guild);

    const voiceChannelBot = voiceConnectionBot.channel;

    console.log(`channel: ${voiceConnectionBot.channel}\nconn: ${voiceConnectionBot}`);

    if (!voiceChannelBot) return message.reply('El bot no está conectado a ningun canal!');

    voiceChannelBot.leave();
  },
};
