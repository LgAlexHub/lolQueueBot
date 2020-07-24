import * as Discord from 'discord.js';
const client = new Discord.Client();
import {
  knowMyRankByName
} from './func.js';
import config from './config.json';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const stringMsg = msg.content;
  if (stringMsg.match(/^-lolRank (.*)/) != null) {
    const summonerName = (stringMsg.match(/^-lolRank (.*)/)[1]);
    const res = await knowMyRankByName(summonerName);
    if (res.length > 1) {
      msg.reply(res);
    } else {
      msg.reply("Ce joueur n'a jamais fait de Ranked ou n'existe pas :( ");
    }
  }
  if (msg.content.match("ping")) {
    msg.channel.send("test");
  }
});

client.login(config.discord.token);