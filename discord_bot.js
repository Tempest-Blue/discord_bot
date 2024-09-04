const fs = require("fs");
const env = require("config/.env.json");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const database = require("gun_scraper/database");
const _ = require("lodash");

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

const path = "C:\\Development\\Discord\\sounds\\";
messages = {
  "!1%": { url: path + "glados_chat_04.mp3" },
  "!100%": { url: path + "glados_chat_01.mp3" },
  "!17%": { url: path + "glados_chat_07.mp3" },
  "!2sad": { url: path + "sad_trombone_-_gaming_sound_effect_hd.mp3" },
  "!3sad": { url: path + "tf_nemesis_Oe7WCXy.mp3" },
  "!420": { url: path + "smoke-weed-everyday-cut-mp3.mp3" },
  "!9000": { url: path + "over9000.swf.mp3" },
  "!alright": {
    url: path + "alright_alright_alright_-_dazed_and_confused.mp3",
  },
  "!another": { url: path + "another-one_dPvHt2Z.mp3", volume: 0.8 },
  "!beautiful": { url: path + "gaben_beautiful_person.mp3" },
  "!brb": { url: path + "ill-be-back.mp3", volume: 0.75 },
  "!brutal": { url: path + "brutal.mp3" },
  "!champ": { url: path + "champ-is-champ-there-mp3cut.mp3" },
  "!cheer": { url: path + "kids_cheering.mp3" },
  "!confused": { url: path + "so_confused.mp3" },
  "!corona": { url: path + "whatsapp-video-2020-03-11-at-19.mp3" },
  "!crab": { url: path + "gaben_space_crab.mp3" },
  "!damn": { url: path + "friday-damn.mp3" },
  "!danger": { url: path + "im_in_danger.mp3" },
  "!daniel": { url: path + "damndaniel.mp3" },
  "!disaster": { url: path + "disastah.mp3" },
  "!doit": { url: path + "senator-palpatine-do-it.mp3" },
  "!dota": { url: path + "lets_play.mp3" },
  "!doto": { url: path + "horn-of-morvalacenarius-dota.mp3" },
  "!ezmoney": { url: path + "easiest_money.mp3" },
  "!f": { url: path + "5a3a6217-9b3e-431a-a8f1-657edc826be4.mp3" },
  "!feelingitnow": { url: path + "are-you-feeling-it-now-mr-krabs.mp3" },
  "!friday": { url: path + "friday-r.mp3" },
  "!goodmorning": { url: path + "goodmorn1.mp3" },
  "!goodness": { url: path + "goodness.mp3" },
  "!groan": { url: path + "misc_soundboard_ti9_crowd_groan.mp3" },
  "!guh": { url: path + "guh.wav" },
  "!haha": { url: path + "the-simpsons-nelsons-haha.mp3" },
  "!hahgay": { url: path + "senor-chang-gay_1.mp3" },
  "!hello": { url: path + "hello-button.mp3" },
  "!hey": { url: path + "rngm-heyyeyaaeyaaaeyaeyaa-mp3cut.mp3" },
  "!holymoly": { url: path + "holy_moly.mp3" },
  "!how": { url: path + "how-could-this-happen-to-me-with-lyrics-46.mp3" },
  "!imback": { url: path + "I'm back...(AKA Terminator 3).mp3" },
  "!imback2": { url: path + "Hello Boys I'm Back.mp3" },
  "!inception": { url: path + "inceptionbutton.mp3" },
  "!jc": { url: path + "cena.mp3" },
  "!jeopardy": { url: path + "jeopardy.mp3" },
  "!learn": { url: path + "this_is_a_good_opportunity_to_learn.mp3" },
  "!mayo": { url: path + "is-mayonnaise-an-instrument.mp3" },
  "!me": { url: path + "its-me-mario.mp3" },
  "!mistakes": { url: path + "you_cant_improve_until_you_make_mistakes.mp3" },
  "!moreyouknow": { url: path + "the-more-you-know.mp3" },
  "!needit": { url: path + "dont_need_it.mp3" },
  "!nextlevel": { url: path + "next_level.mp3" },
  "!niceu": { url: path + "mic-check-ep_2.mp3" },
  "!nochill": { url: path + "no_chill.mp3" },
  "!noice": { url: path + "nooice.mp3" },
  "!nothing": { url: path + "nothing_that_can_stop_this_man.mp3.mp3" },
  "!nottoday": { url: path + "not_today.mp3" },
  "!ok": { url: path + "lil-jon-okay.mp3" },
  "!oof": { url: path + "sm64_mario_oof.mp3" },
  "!oy": { url: path + "oy_oy_oy.mp3" },
  "!playedyoself": { url: path + "dont-ever-play-yourself-dj-khaled-vine.mp3" },
  "!power": { url: path + "i-have-the-power.mp3" },
  "!proud": { url: path + "gaben_im_very_proud.mp3" },
  "!ready": { url: path + "john-cena-prank-call.mp3" },
  "!rekt": { url: path + "riggity-riggity-wrecked-son.mp3" },
  "!rip": {
    url: path + "vicetone-tony-igy-astronomia-2014-audiotrimmer.mp3",
    volume: 0.75,
  },
  "!sad": { url: path + "the-price-is-right-losing-horn.mp3" },
  "!sorry": { url: path + "sorry.mp3" },
  "!spooky": { url: path + "the-x-files-theme.mp3" },
  "!surprise": { url: path + "surprise-motherfucker.mp3" },
  "!trap": { url: path + "admiral-ackbar-its-a-trap-.mp3" },
  "!treat": { url: path + "treat-yo-self.mp3" },
  "!unreal": { url: path + "that_was_unreal.mp3" },
  "!vitas": { url: path + "vitas.mp3", volume: 0.5 },
  "!what": { url: path + "lil-jon-what.mp3" },
  "!wisdom": { url: path + "making_mistakes_is_the_path_to_wisdom.mp3" },
  "!woo": { url: path + "coming_through_with_the_woooo.mp3" },
  "!wow": { url: path + "wow.mp3" },
  "!yay": { url: path + "grunt_birthday_sound.mp3" },
  "!yeah": { url: path + "yeeeeeeeah.mp3" },
};
let connection;

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (interaction) => {
  if (!interaction.author.bot) {
    console.log(interaction);
    const message = interaction.content;
    if (message == "!help") {
      var commands = "";
      Object.keys(messages).forEach(function (command) {
        commands += command + "\n";
      });
      await interaction.reply("Available Commands - \n" + commands);
    } else if (message == "!ping") {
      await interaction.reply({
        content: "Pong",
      });
    } else if (
      _.startsWith(message, "!subscribe firearm") ||
      _.startsWith(message, "!subscribe accessory") ||
      _.startsWith(message, "!unsubscribe firearm") ||
      _.startsWith(message, "!unsubscribe accessory")
    ) {
      const action = _.chain(message)
        .split(" ")
        .get("[0]")
        .value()
        .substring(1);
      const type = _.chain(message).split(" ").get("[1]").value();
      let keywords = _.chain(message).split(" ").get("[2]").value();
      const user_id = interaction.author.id;
      const user_name = interaction.author.globalName;

      if (keywords) {
        keywords = keywords.split(",");
        if (type == "firearm") {
          action == "subscribe"
            ? await database.subscribe_firearm(user_id, user_name, keywords)
            : await database.unsubscribe_firearm(user_id, keywords);
        } else if (type == "accessory") {
          action == "subscribe"
            ? await database.subscribe_accessory(user_id, user_name, keywords)
            : await database.unsubscribe_accessory(user_id, keywords);
        }
        await return_user_keywords({ user_id, user_name, type, interaction });
      } else {
        await interaction.reply({
          content: `Missing keywords you want ${action}d`,
        });
      }
    } else if (
      interaction.guild &&
      messages[message] &&
      messages[message].url
    ) {
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
        console.log("The audio player has started playing!");
      });
      const subscription = connection.subscribe(player);
      const resource = createAudioResource(messages[message].url);
      player.play(resource);
    }
  }
});

async function return_user_keywords({ user_id, user_name, type, interaction }) {
  const found_keywords = await database.get_user_keywords({
    user_id,
    user_name,
    type,
  });
  await interaction.reply({
    content: found_keywords.length
      ? `Your subscribed ${type} keywords are ${found_keywords.join(",")}`
      : "Your keywords list is empty",
  });
}
client.login(env["Joe"]).then((response) => console.log("Logged In", response));
