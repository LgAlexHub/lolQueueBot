/*
    "https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + summonerId : Voir ce qu'il y a dans la game en cours 
    "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId : Voir info ranked
*/

import fetch from 'node-fetch';
import config from '../config.js';
import { isSummonnerInCache } from './cache.js';

function fetchApi(stringUrl) {
    console.log(`API Request > ${stringUrl}`);
    return fetch(encodeURI(stringUrl + `?api_key=${config.riot.apiKey}`)).then(res => res.json());
}

async function getRankedInformation(summonerId) {
    let resAwait = await fetchApi(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`);
    return resAwait;
}

async function getSummonerObjByName(summonerName) {
    let resAwait = await fetchApi(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`);
    return resAwait;
}

async function getChamionList() {
    let version = await fetch(encodeURI("https://ddragon.leagueoflegends.com/api/versions.json")).then(res => res.json());
    let championList = await fetch(encodeURI(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/data/en_US/champion.json`)).then(res => res.json());
    return championList;
}

async function getASummonerGame(summonerName, cacheMap) {
    let summonerObj = await isSummonnerInCache(summonerName, cacheMap);
    let gameObj = await fetchApi(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerObj.id}`);
    if (gameObj.gameId != undefined) {
        let tmpParticipants = gameObj.participants;
        let participants = new Map();
        for (let i = 0; i < tmpParticipants.length; i++) {
            await participants.set(gameObj.participants[i].summonerName, isSummonnerInCache(gameObj.participants[i].summonerName, cacheMap));
        }
        return gameObj;
    }
}

async function knowMyRankByName(summonerName, cacheMap) {
    const summonerObj = await isSummonnerInCache(summonerName, cacheMap);
    const objRanked = await getRankedInformation(summonerObj.id);
    if (!objRanked.length > 0) return "";
    let returnString = "";
    returnString += "Nom d'invocateur: **" + summonerObj.name + "** ";
    for (let i = 0; i < objRanked.length; i++) {
        if (objRanked[i].queueType == "RANKED_SOLO_5x5") {
            returnString += "Rang: **" + objRanked[i].tier + " " + objRanked[i].rank + " " + objRanked[i].leaguePoints + " **lp ";
            returnString += "Win: **" + objRanked[i].wins + " **Losses:** " + objRanked[i].losses + " **WinRate:** " + (objRanked[i].wins / (objRanked[i].wins + objRanked[i].losses) * 100).toFixed(2) + "**% ";
        }
    }
    return returnString;
}

export {
    knowMyRankByName, getChamionList, getSummonerObjByName, getASummonerGame
}