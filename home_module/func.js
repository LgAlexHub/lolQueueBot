/*
    "https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + summonerId : Voir ce qu'il y a dans la game en cours 
    "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId : Voir info ranked
*/

import fetch from 'node-fetch';
import config from '../config.js';
import { isSummonnerInCache, isRankedInCache } from './cache.js';

let listChamp = null

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

async function getGameObj(summonerId) {
    let resAwait = await fetchApi(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`);
    return resAwait;
}

async function getChampionList() {
    if (listChamp == null) {
        let version = await fetch(encodeURI("https://ddragon.leagueoflegends.com/api/versions.json")).then(res => res.json());
        listChamp = await fetch(encodeURI(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/data/en_US/champion.json`)).then(res => res.json());
    }

    return listChamp;
}

async function returnChampNameById(champId) {
    await getChampionList();
    let array = Object.keys(listChamp.data);
    for (let i = 0; i < array.length; i++) {
        if (listChamp.data[array[i]].key == champId) {
            return listChamp.data[array[i]].name;
            //return listChamp.data[array[i]].name;
        }
    }
    return null;
}

async function knowMyRankByName(summonerName) {
    const summonerObj = await isSummonnerInCache(summonerName);
    const objRanked = await getRankedInformation(summonerObj.getSummonerObj().id);
    if (!objRanked.length > 0) return null;
    for (let i = 0; i < objRanked.length; i++) {
        if (objRanked[i].queueType == "RANKED_SOLO_5x5") {
            return objRanked[i];
        }
    }
}

async function displayRankInformation(summonerName) {
    const infoPlayRank = await isRankedInCache(summonerName);
    if (infoPlayRank != undefined) {
        let resString = `Summoner Name:** ${infoPlayRank.summonerName}** Rank: **${infoPlayRank.tier} ${infoPlayRank.rank}** Wins: **${infoPlayRank.wins}** Losses: **${infoPlayRank.losses}** WinRate: **${((infoPlayRank.wins) / (infoPlayRank.wins + infoPlayRank.losses) * 100).toFixed(2)}%**`;
        return resString;
    }
}

function displayRankInformationByObj(summonerObj) {
    let resString;
    if (summonerObj.leagueId != undefined) {
        resString = `Summoner Name:** ${summonerObj.summonerName}** Rank: **${summonerObj.tier} ${summonerObj.rank}** Wins: **${summonerObj.wins}** Losses: **${summonerObj.losses}** WinRate: **${((summonerObj.wins) / (summonerObj.wins + summonerObj.losses) * 100).toFixed(2)}%**`;
        return resString;
    } else {
        resString = `Summoner Name:** ${summonerObj.name}** Rank: **Non Classé**`;
    }
    return resString;
}


async function displayGameInformation(summonerName) {
    let resString = undefined;
    let summonerObj = await isSummonnerInCache(summonerName);
    if (summonerObj != undefined) {
        let gameObj = await getGameObj(summonerObj.getSummonerObj().id);
        if (gameObj.gameId != undefined) {
            resString = "";
            let participantsArrayRankd = new Array();
            let participants = gameObj.participants;
            let arrayChamp = new Array();
            for (let i = 0; i < participants.length; i++) {
                let tmpCheckRanked = await isRankedInCache(participants[i].summonerName);
                if (tmpCheckRanked != undefined) {
                    participantsArrayRankd.push(tmpCheckRanked);
                } else {
                    let unranked = await isSummonnerInCache(participants[i].summonerName);
                    participantsArrayRankd.push(unranked.getSummonerObj());
                }
                arrayChamp.push(await returnChampNameById(participants[i].championId));
            }
            resString += "\n:blue_square: Equipe n°1 :blue_square: \n"
            for (let i = 0; i < participantsArrayRankd.length; i++) {
                if (i > 0 && (participants[i].teamId != participants[i - 1].teamId)) {
                    resString += ":red_square: Equipe n°2 :red_square: \n";
                }
                resString += displayRankInformationByObj(participantsArrayRankd[i]) + '\n';
                resString += "Champion: **" + arrayChamp[i] + "** \n\n";
            }
        }else{
            resString = "Ce joueur n'est pas en partie";
        }
    }
    return resString;
}

export {
    displayRankInformation, getSummonerObjByName, knowMyRankByName, displayGameInformation
}