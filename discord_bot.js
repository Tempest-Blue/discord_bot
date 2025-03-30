// Utilities
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Discord Bot Config
const env = require('config/.env.json');
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
  MessageFlags,
  EmbedBuilder,
} = require('discord.js');

// Database Interactions
const database = require('gun_scraper/database');
const discord = require('gun_scraper/discord');

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

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.login(env['redx_server_token']).then((response) => console.log('Logged In', response));

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    // 🟦 Slash command handler
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      await command.execute(interaction);
      return;
    }

    // 🟩 Autocomplete handler
    else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(`Autocomplete error for ${interaction.commandName}:`, error);
      }

      return;
    }

    // 🟨 Button interaction handler
    else if (interaction.isButton()) {
      if (interaction.customId === 'mark_as_read') {
        await discord.mark_dms_as_read({
          client,
          user_discord_id: interaction.user.id,
        });
      }

      // Add more button handlers as needed
      return;
    }

    // 🟧 Add more interaction types (select menus, modals) as needed here
  } catch (error) {
    console.error('Interaction handler error:', error);

    const error_response = {
      content: 'There was an error while executing this interaction!',
      flags: MessageFlags.Ephemeral,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(error_response);
    } else {
      await interaction.reply(error_response);
    }
  }
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  // await broadcast_update();
});

async function broadcast_update() {
  const update_notification = new EmbedBuilder()
    .setTitle('🚨     UPDATES     🚨')
    .setDescription(
      `
        **Subscription Changes**  
        • Deprecated \`!sub\` / \`!unsub\` text messages  
        • Use slash command \`/keyword\`

        **PM Changes**
        • Mark recent as read button changes last 50 posts' color to red
        • Color coding
          🟪 - Posts from GunDeals  
          🟧 - Posts specifically for firearms  
          🟥 - Posts already read  
          🟦 - Default color for everything else  
        • Labels
          🔫 - Firearms
          🪖 - Accessories
      `
    )
    .setColor('#57f287');

  const guilds = await client.guilds.fetch();
  let guild = guilds.find((guild) => guild.name.toLowerCase() == "redx's server");
  const guild_id = guild.id;
  guild = await client.guilds.fetch(guild_id);
  const channels = await guild.channels.fetch();
  const found_channel = channels.find((channel) => channel.name === 'gunz-online');
  if (found_channel.isTextBased() && 'threads' in found_channel) {
    const thread_list = await found_channel.threads.fetchActive();

    const found_thread = thread_list.threads.find(
      (thread) => thread.name.toLowerCase() === 'keyword notifications'.toLowerCase()
    );

    if (found_thread) {
      await found_thread.send({ embeds: [update_notification] });
    }
  }

  const subscriber_ids = await database.get_all_subscriber_discord_ids();
  for (const subscriber of subscriber_ids) {
    const subscriber_id = subscriber.discord_id;
    await client.users.fetch(subscriber_id).then(async (user) => {
      await user.send({ embeds: [update_notification] });
    });
  }
}
