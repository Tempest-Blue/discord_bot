const { SlashCommandBuilder, inlineCode } = require('discord.js');
const _ = require('lodash');

const database = require('gun_scraper/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('keyword')
    .setDescription('notification subscriptions for firearms and firearm accessories')
    .addSubcommand((subcommand) =>
      subcommand.setName('list').setDescription('list your current keywords')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('subscriptions')
        .setDescription('add or remove keywords here')
        .addStringOption((option) =>
          option
            .setName('action')
            .setDescription('add or remove keywords?')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('firearms or accessories?')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption((option) =>
          option
            .setName('keywords')
            .setDescription(
              `keywords separated by commas - cz, daniel defense, beretta - use /keywords list to see current`
            )
            .setRequired(true)
        )
    ),
  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    if (focusedOption.name === 'action') {
      choices = ['subscribe', 'unsubscribe'];
    }

    if (focusedOption.name === 'type') {
      choices = ['firearm', 'accessory', 'firearm and accessory'];
    }

    const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
    await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
  },
  async execute(interaction) {
    const sub_command = interaction.options.getSubcommand();

    if (sub_command === 'list') {
      const user_discord_id = interaction.user.id;
      return await return_user_keywords({ user_discord_id, interaction });
    } else {
      const action = interaction.options.getString('action');
      const type = interaction.options.getString('type');
      const keyword_string = interaction.options.getString('keywords');
      await parse_firearm_command({ action, type, keyword_string, interaction });
    }
  },
};

async function parse_firearm_command({ action, type, keyword_string, interaction }) {
  let keywords = keyword_string ? keyword_string.split(',') : [];
  keywords = keywords.map((keyword) => keyword.trim());
  keywords = keywords.filter((keyword) => keyword); // remove empty keywords
  const user_discord_id = interaction.user.id;
  const user_name = interaction.user.globalName;

  const command_map = {
    firearm: {
      subscribe: async () => database.subscribe_firearm({ user_discord_id, user_name, keywords }),
      unsubscribe: async () => database.unsubscribe_firearm({ user_discord_id, keywords }),
    },
    accessory: {
      subscribe: async () => database.subscribe_accessory({ user_discord_id, user_name, keywords }),
      unsubscribe: async () => database.unsubscribe_accessory({ user_discord_id, keywords }),
    },
    firearm_and_accessory: {
      subscribe: async () => {
        database.subscribe_firearm({ user_discord_id, user_name, keywords });
        database.subscribe_accessory({ user_discord_id, user_name, keywords });
      },
      unsubscribe: async () => {
        database.subscribe_accessory({ user_discord_id, user_name, keywords });
        database.unsubscribe_accessory({ user_discord_id, keywords });
      },
    },
  };

  if (keywords && _.get(command_map, `${type}.${action}`)) {
    await command_map[type.replace(' ', '_')][action]();
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
