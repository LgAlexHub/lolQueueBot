const Discord = require('discord.js');
const client = new Discord.Client();
const support = require('./func.js');
const https = require('https');

client.login("NzM1ODY0ODA5NzE0ODc2NDI3.XxmfTA.Wp3FcNI5Vo6NN1kHaqsj_olYH6A");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('message', async msg => {
    let stringMsg  = msg.content;
    if (stringMsg.match(/^-lolRank (.*)/) != null){
      let summonerName = (stringMsg.match(/^-lolRank (.*)/)[1]);
      let res = await support.knowMyRankByName(summonerName);
      if (res.length>1) {
        msg.reply(res);
      }else{
        msg.reply("Ce joueur n'a jamais fait de Ranked ou n'existe pas :( ");
      }
    }
    if (msg.content.match("ping")) {
      msg.channel.send("test");
    }
  });




