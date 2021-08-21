const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var connection;
client.on('message', async message => {
  // Join the same voice channel of the author of the message
  console.log('CHANNELS - ', message.guild.channels);
  var voiceChannel = message.member.voice.channel;
  if (voiceChannel) {
    const path = "C:\\Development\\Discord\\sounds\\";
    messages = {
      '!champ':        {url: path + 'champ-is-champ-there-mp3cut.mp3'},
      '!jc':           {url: path + 'cena.mp3'},
      '!ready':        {url: path + 'john-cena-prank-call.mp3'},
      '!surprise':     {url: path + 'surprise-motherfucker.mp3'},
      '!inception':    {url: path + 'inceptionbutton.mp3'},
      '!sad':          {url: path + 'the-price-is-right-losing-horn.mp3'},
      '!2sad':         {url: path + 'sad_trombone_-_gaming_sound_effect_hd.mp3'},
      '!3sad':         {url: path + 'tf_nemesis_Oe7WCXy.mp3'},
      '!hahgay':       {url: path + 'senor-chang-gay_1.mp3'},
      '!corona':       {url: path + 'whatsapp-video-2020-03-11-at-19.mp3'},
      '!nottoday':     {url: path + 'not_today.mp3'},
      '!haha':         {url: path + 'the-simpsons-nelsons-haha.mp3'},
      '!9000':         {url: path + 'over9000.swf.mp3'},
      '!niceu':        {url: path + 'mic-check-ep_2.mp3'},
      '!noice':        {url: path + 'nooice.mp3'},
      '!420':          {url: path + 'smoke-weed-everyday-cut-mp3.mp3'},
      '!f':            {url: path + '5a3a6217-9b3e-431a-a8f1-657edc826be4.mp3'},
      '!yeah':         {url: path + 'yeeeeeeeah.mp3'},
      '!what':         {url: path + 'lil-jon-what.mp3'},
      '!ok':           {url: path + 'lil-jon-okay.mp3'},
      '!rekt':         {url: path + 'riggity-riggity-wrecked-son.mp3'},
      '!cheer':        {url: path + 'kids_cheering.mp3'},
      '!hey':          {url: path + 'rngm-heyyeyaaeyaaaeyaeyaa-mp3cut.mp3'},
      '!vitas':        {url: path + 'vitas.mp3', volume: .5},
      '!brb':          {url: path + 'ill-be-back.mp3', volume: .75},
      '!hello':        {url: path + 'hello-button.mp3'},
      '!rip':          {url: path + 'vicetone-tony-igy-astronomia-2014-audiotrimmer.mp3', volume: .75},
      '!how':          {url: path + 'how-could-this-happen-to-me-with-lyrics-46.mp3'},
      '!doto':         {url: path + 'horn-of-morvalacenarius-dota.mp3'},
      '!daniel':       {url: path + 'damndaniel.mp3'},
      '!another':      {url: path + 'another-one_dPvHt2Z.mp3', volume: .8},
      '!oof':          {url: path + 'roblox-death-sound_1_7Y6eb7o.mp3'},
      '!ooof':         {url: path + 'sm64_mario_oof.mp3'},
      '!treat':        {url: path + 'treat-yo-self.mp3'},
      '!me':           {url: path + 'its-me-mario.mp3'},
      '!damn':         {url: path + 'friday-damn.mp3'},
      '!feelingitnow': {url: path + 'are-you-feeling-it-now-mr-krabs.mp3'},
      '!confused':     {url: path + 'so_confused.mp3'},
      '!needit':       {url: path + 'dont_need_it.mp3'},
      '!spooky':       {url: path + 'the-x-files-theme.mp3'},
      '!jeopardy':     {url: path + 'jeopardy.mp3'},
      '!goodmorning':  {url: path + 'goodmorn1.mp3'},
      '!mayo':         {url: path + 'is-mayonnaise-an-instrument.mp3'},
      '!yay':          {url: path + 'grunt_birthday_sound.mp3'},
      '!friday':       {url: path + 'friday-r.mp3'},
      '!power':        {url: path + 'i-have-the-power.mp3'},
      '!doit':         {url: path + 'senator-palpatine-do-it.mp3'},
      '!wow':          {url: path + 'wow.mp3'},
      '!guh':          {url: path + 'guh.wav'},
      '!moreyouknow':  {url: path + 'the-more-you-know.mp3'},
      '!trap':         {url: path + 'admiral-ackbar-its-a-trap-.mp3'},
      '!danger':       {url: path + 'im_in_danger.mp3'},
    };
    try {
      if (message.content == '!help') {
        var commands = '';
        Object.keys(messages).forEach(function(command) {
          commands += command + '\n';
        })
        message.channel.send('Available Commands - \n' + commands);
      }
      else if (message.content == '!ping') {
        message.channel.send('Pong');``
      }
      else if (messages[message.content] && messages[message.content].url) {
        if (!connection || (voiceChannel.id != connection.channel.id)) {
          connection = await voiceChannel.join();
        }
        const dispatcher = connection.play(messages[message.content].url, { volume: messages[message.content].volume || 1});
        // dispatcher.on("finish", () => {
        //   voiceChannel.leave();
        // });
      }
    }
    catch(e) {
      message.channel.send('Could not play - ' + e);
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  // console.log('OLD', oldState.channelID);
  // console.log('NEW', newState.channelID);
  if (oldState.channelID == newState.channelID) {
    return;
  }
  channelIds = [
    '697596073513975868', // In A Meeting
    '701902846106402908', // 1000% Focus
    '715649577474326611', // Away From Keyboard
    // '693118985616621616' // Working Time
  ];
  if (channelIds.find((id) => {return id == newState.channelID})) {
    newState.setMute(true);
    newState.setDeaf(true);
  }
  else {
    newState.setMute(false);
    newState.setDeaf(false);
  }
});

client.login('Njk4MzM1NTk0MzQ1OTIyNjcx.XpEYTA.a1H8F3oGk3Fzz2wwzjLn6xGBvHc');