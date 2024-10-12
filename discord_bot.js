// Utilities
const fs = require('fs');
const _ = require('lodash');

// Discord Bot Config
const env = require('config/.env.json');
const { sound_bytes } = require('config/sound_bytes.js');
const { Client, Events, GatewayIntentBits, Partials, inlineCode } = require('discord.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require('@discordjs/voice');

// Database Interactions
const database = require('gun_scraper/database');

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});
let connection;

client.login(env['Joe']).then((response) => console.log('Logged In', response));

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const general_commands = {
  '!ping': async (interaction) => {
    await interaction.reply('Pong');
  },
  '!help': async (interaction) => {
    const available_commands = Object.keys(sound_bytes).join('\n');
    await interaction.reply(`Available Commands:\n${available_commands}`);
  },
};

const is_subscription_command = (message) => {
  const subscription_commands = [
    '!sub firearm',
    '!sub accessory',
    '!unsub firearm',
    '!unsub accessory',
  ];
  return subscription_commands.some((cmd) => _.startsWith(message, cmd));
};

client.on(Events.MessageCreate, async (interaction) => {
  if (!interaction.author.bot) {
    const message = interaction.content.trim();

    if (general_commands[message]) {
      await general_commands[message](interaction);
      return;
    }
    // Handle subscription commands
    if (is_subscription_command(message)) {
      await parse_firearm_command({ message, interaction });
      return;
    }

    // Handle sound byte commands
    if (interaction.guild && sound_bytes[message]?.url) {
      await play_sound_byte({ interaction });
      return;
    }
  }
});

async function play_sound_byte({ interaction }) {
  connection = await joinVoiceChannel({
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

async function parse_firearm_command({ message, interaction }) {
  const [action, type] = message.substring(1).split(' ', 2);
  let keyword_string = message.substring(3 + action.length + type.length);
  let keywords = keyword_string ? keyword_string.split(',') : [];
  keywords = keywords.map((keyword) => keyword.trim());
  keywords = keywords.filter((keyword) => keyword);
  const user_discord_id = interaction.author.id;
  const user_name = interaction.author.globalName;

  const command_map = {
    firearm: {
      sub: async () => database.subscribe_firearm({ user_discord_id, user_name, keywords }),
      unsub: async () => database.unsubscribe_firearm({ user_discord_id, keywords }),
    },
    accessory: {
      sub: async () => database.subscribe_accessory({ user_discord_id, user_name, keywords }),
      unsub: async () => database.unsubscribe_accessory({ user_discord_id, keywords }),
    },
  };

  if (keywords && _.get(command_map, `${type}.${action}`)) {
    await command_map[type][action]();
  }

  await return_user_keywords({ user_discord_id, interaction });
}

async function return_user_keywords({ user_discord_id, interaction }) {
  const found_keywords = await database.get_user_keywords_by_discord_id({
    user_discord_id,
  });
  const firearm_keywords = found_keywords
    .filter((keyword) => keyword.firearm)
    .map((keyword) => keyword.keyword.toUpperCase())
    .sort();

  const accessory_keywords = found_keywords
    .filter((keyword) => keyword.accessory)
    .map((keyword) => keyword.keyword.toUpperCase())
    .sort();

  const firearm_reply = firearm_keywords
    ? `Subbed firearm keywords: \n${inlineCode(firearm_keywords.join(', '))}`
    : 'Subbed firearm keyword list is empty';
  const accessory_reply = accessory_keywords
    ? `Subbed accessory keywords: \n${inlineCode(accessory_keywords.join(', '))}`
    : 'Subbed accessory keyword list is empty';

  await interaction.reply({
    content: `${firearm_reply}\n${accessory_reply}`,
  });
}
