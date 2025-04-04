const { SlashCommandBuilder } = require('discord.js');
const { sound_bytes } = require('../../utilities/sound_byte_paths'); // adjust as needed

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists available sound byte commands'),

  async execute(interaction) {
    const available_commands = Object.keys(sound_bytes).join('\n');
    await interaction.reply(`Available Sound Byte Commands:\n${available_commands}`);
  },
};
