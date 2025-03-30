// commands/sound.js
const { SlashCommandBuilder } = require('discord.js');
const { sound_bytes } = require('config/sound_bytes.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require('@discordjs/voice');

async function play_sound_byte({ interaction }) {
  const connection = await joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });
  if (!connection) {
    connection.destroy();
  }

  const player = createAudioPlayer({});
  player.on(AudioPlayerStatus.Playing, () => {
    console.log('The audio player has started playing!');
  });
  const resource = createAudioResource(sound_bytes[message].url);
  player.play(resource);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a sound byte')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('Name of the sound byte')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString('name');

    if (!sound_bytes[name]) {
      return await interaction.reply({
        content: `Sound "${name}" not found.`,
        ephemeral: true,
      });
    }

    // Inject interaction for playback
    await play_sound_byte({ interaction });
  },

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused();
    let choices = Object.keys(sound_bytes);
    if (!focused) {
      return await interaction.respond(
        choices.slice(0, 25).map((choice) => ({ name: choice, value: choice }))
      );
    }
    choices = choices.filter((name) => name.startsWith(focused.toLowerCase()));

    await interaction.respond(choices.map((choice) => ({ name: choice, value: choice })));
  },
};
