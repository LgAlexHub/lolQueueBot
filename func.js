import fetch from 'node-fetch';
import config from './config.js';

function fetchApi(stringUrl) {
    return fetch(encodeURI(stringUrl + `?api_key=${config.riot.apiKey}`)).then(res => res.json());
}

async function getChamionList() {
    let version =await fetch(encodeURI("https://ddragon.leagueoflegends.com/api/versions.json")).then(res => res.json());
    let championList=await fetch(encodeURI(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/data/en_US/champion.json`)).then(res=>res.json());
    return championList;
}

async function specAGame(summonerName) {
    const summonerObj = await getSummonerObjByName(summonerName);
    const summonerId = summonerObj.id;
    const gameObj = await fetchApi("https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + summonerId);
    if (gameObj.gameId == undefined) return "Pas de partie en cours pour ce joueur";
    let resString ="";
    const participantsArrayObj = gameObj.participants;
    for (let i = 0 ; i < participantsArrayObj.length ; i++){
        resString += await knowMyRankByName(participantsArrayObj[i].summonerName);
        if(participantsArrayObj[i].teamId == 100) {
            resString +=":blue_circle: \n\n";
        }else{
            resString +=":red_circle: \n\n";
        }
    }
    return resString;
}

function getSummonerObjByName(summonerName) {
    return fetchApi("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName);
}

async function knowMyRankByName(summonerName) {
    const summonerObj = await getSummonerObjByName(summonerName);
    const summonerId = summonerObj.id;
    const objRanked = await fetchApi("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId);
    if (!objRanked.length > 0) return "";
    let returnString = "";
    returnString += "Nom d'invocateur: **" +summonerObj.name+ "** ";
    for (let i = 0; i < objRanked.length; i++) {
        if (objRanked[i].queueType == "RANKED_SOLO_5x5") {
            returnString += "Rang: **" + objRanked[i].tier + " " + objRanked[i].rank + " " + objRanked[i].leaguePoints + " **lp ";
            returnString += "Win: **" + objRanked[i].wins + " **Losses:** " + objRanked[i].losses + " **WinRate:** " + (objRanked[i].wins / (objRanked[i].wins + objRanked[i].losses) * 100).toFixed(2) + "**% ";
        }
    }
    return returnString;
}

export {
    knowMyRankByName, specAGame, getChamionList
}