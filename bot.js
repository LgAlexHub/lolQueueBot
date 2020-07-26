import * as Discord from 'discord.js';
import config from './config.js';
import {
  knowMyRankByName, getChamionList, getASummonerGame
} from './home_module/func.js';
import { isSummonnerInCache } from './home_module/cache.js'
const client = new Discord.Client();
var cacheSummoner;


client.on('ready', () => {
  cacheSummoner = new Map();
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
    res = await knowMyRankByName(summonerName, cacheSummoner);
    msg.reply(res);
  } else if (stringMsg.match(/^-spec (.*)/) != null) {
    summonerName = stringMsg.match(/^-spec (.*)/)[1];
    res =  await getASummonerGame(summonerName,cacheSummoner);
    console.log(res);
  } else if (msg.content.match("ping")) {
    msg.reply("pong");
  }
});

client.login(config.discord.token);