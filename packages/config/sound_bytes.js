const { PATH } = require("./constants");
const sound_bytes = {
  "!1%": { url: PATH + "glados_chat_04.mp3" },
  "!100%": { url: PATH + "glados_chat_01.mp3" },
  "!17%": { url: PATH + "glados_chat_07.mp3" },
  "!2sad": { url: PATH + "sad_trombone_-_gaming_sound_effect_hd.mp3" },
  "!3sad": { url: PATH + "tf_nemesis_Oe7WCXy.mp3" },
  "!420": { url: PATH + "smoke-weed-everyday-cut-mp3.mp3" },
  "!9000": { url: PATH + "over9000.swf.mp3" },
  "!alright": {
    url: PATH + "alright_alright_alright_-_dazed_and_confused.mp3",
  },
  "!another": { url: PATH + "another-one_dPvHt2Z.mp3", volume: 0.8 },
  "!beautiful": { url: PATH + "gaben_beautiful_person.mp3" },
  "!brb": { url: PATH + "ill-be-back.mp3", volume: 0.75 },
  "!brutal": { url: PATH + "brutal.mp3" },
  "!champ": { url: PATH + "champ-is-champ-there-mp3cut.mp3" },
  "!cheer": { url: PATH + "kids_cheering.mp3" },
  "!confused": { url: PATH + "so_confused.mp3" },
  "!corona": { url: PATH + "whatsapp-video-2020-03-11-at-19.mp3" },
  "!crab": { url: PATH + "gaben_space_crab.mp3" },
  "!damn": { url: PATH + "friday-damn.mp3" },
  "!danger": { url: PATH + "im_in_danger.mp3" },
  "!daniel": { url: PATH + "damndaniel.mp3" },
  "!disaster": { url: PATH + "disastah.mp3" },
  "!doit": { url: PATH + "senator-palpatine-do-it.mp3" },
  "!dota": { url: PATH + "lets_play.mp3" },
  "!doto": { url: PATH + "horn-of-morvalacenarius-dota.mp3" },
  "!ezmoney": { url: PATH + "easiest_money.mp3" },
  "!f": { url: PATH + "5a3a6217-9b3e-431a-a8f1-657edc826be4.mp3" },
  "!feelingitnow": { url: PATH + "are-you-feeling-it-now-mr-krabs.mp3" },
  "!friday": { url: PATH + "friday-r.mp3" },
  "!goodmorning": { url: PATH + "goodmorn1.mp3" },
  "!goodness": { url: PATH + "goodness.mp3" },
  "!groan": { url: PATH + "misc_soundboard_ti9_crowd_groan.mp3" },
  "!guh": { url: PATH + "guh.wav" },
  "!haha": { url: PATH + "the-simpsons-nelsons-haha.mp3" },
  "!hahgay": { url: PATH + "senor-chang-gay_1.mp3" },
  "!hello": { url: PATH + "hello-button.mp3" },
  "!hey": { url: PATH + "rngm-heyyeyaaeyaaaeyaeyaa-mp3cut.mp3" },
  "!holymoly": { url: PATH + "holy_moly.mp3" },
  "!how": { url: PATH + "how-could-this-happen-to-me-with-lyrics-46.mp3" },
  "!imback": { url: PATH + "I'm back...(AKA Terminator 3).mp3" },
  "!imback2": { url: PATH + "Hello Boys I'm Back.mp3" },
  "!inception": { url: PATH + "inceptionbutton.mp3" },
  "!jc": { url: PATH + "cena.mp3" },
  "!jeopardy": { url: PATH + "jeopardy.mp3" },
  "!learn": { url: PATH + "this_is_a_good_opportunity_to_learn.mp3" },
  "!mayo": { url: PATH + "is-mayonnaise-an-instrument.mp3" },
  "!me": { url: PATH + "its-me-mario.mp3" },
  "!mistakes": { url: PATH + "you_cant_improve_until_you_make_mistakes.mp3" },
  "!moreyouknow": { url: PATH + "the-more-you-know.mp3" },
  "!needit": { url: PATH + "dont_need_it.mp3" },
  "!nextlevel": { url: PATH + "next_level.mp3" },
  "!niceu": { url: PATH + "mic-check-ep_2.mp3" },
  "!nochill": { url: PATH + "no_chill.mp3" },
  "!noice": { url: PATH + "nooice.mp3" },
  "!nothing": { url: PATH + "nothing_that_can_stop_this_man.mp3.mp3" },
  "!nottoday": { url: PATH + "not_today.mp3" },
  "!ok": { url: PATH + "lil-jon-okay.mp3" },
  "!oof": { url: PATH + "sm64_mario_oof.mp3" },
  "!oy": { url: PATH + "oy_oy_oy.mp3" },
  "!playedyoself": { url: PATH + "dont-ever-play-yourself-dj-khaled-vine.mp3" },
  "!power": { url: PATH + "i-have-the-power.mp3" },
  "!proud": { url: PATH + "gaben_im_very_proud.mp3" },
  "!ready": { url: PATH + "john-cena-prank-call.mp3" },
  "!rekt": { url: PATH + "riggity-riggity-wrecked-son.mp3" },
  "!rip": {
    url: PATH + "vicetone-tony-igy-astronomia-2014-audiotrimmer.mp3",
    volume: 0.75,
  },
  "!sad": { url: PATH + "the-price-is-right-losing-horn.mp3" },
  "!sorry": { url: PATH + "sorry.mp3" },
  "!spooky": { url: PATH + "the-x-files-theme.mp3" },
  "!surprise": { url: PATH + "surprise-motherfucker.mp3" },
  "!trap": { url: PATH + "admiral-ackbar-its-a-trap-.mp3" },
  "!treat": { url: PATH + "treat-yo-self.mp3" },
  "!unreal": { url: PATH + "that_was_unreal.mp3" },
  "!vitas": { url: PATH + "vitas.mp3", volume: 0.5 },
  "!what": { url: PATH + "lil-jon-what.mp3" },
  "!wisdom": { url: PATH + "making_mistakes_is_the_path_to_wisdom.mp3" },
  "!woo": { url: PATH + "coming_through_with_the_woooo.mp3" },
  "!wow": { url: PATH + "wow.mp3" },
  "!yay": { url: PATH + "grunt_birthday_sound.mp3" },
  "!yeah": { url: PATH + "yeeeeeeeah.mp3" },
};

module.exports = {
  sound_bytes,
};