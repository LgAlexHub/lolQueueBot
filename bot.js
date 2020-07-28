import * as Discord from 'discord.js';
import config from './config.js';
import {
  getChamionList, getASummonerGame
} from './home_module/func.js';
import {
  isSummonnerInCache, isRankedInCache, clearCache
} from './home_module/cache.js'
const client = new Discord.Client();

client.on('ready', () => {
  client.user.setActivity("-helplol");
  console.log(`${client.user.tag} Connecté`);
});

client.on('message', async msg => {
  const stringMsg = msg.content;
  let summonerName;
  let res;
  if (stringMsg === "-helplol") {
    msg.reply("Commande disponible : \n-lolRank <Nom d'invocateur> \n-spec <Nom d'invocateur>");
  } else if (stringMsg.match(/^-lolRank (.*)/) != null) {
    summonerName = stringMsg.match(/^-lolRank (.*)/)[1];
    res = await isSummonnerInCache(summonerName);
    console.log(res);
  } else if (stringMsg.match(/^-spec (.*)/) != null) {
    summonerName = stringMsg.match(/^-spec (.*)/)[1];
    res = await getASummonerGame(summonerName, cacheSummoner);
  } else if (msg.content.match("ping")) {
    msg.reply("pong");
  }
});

client.login(config.discord.token);