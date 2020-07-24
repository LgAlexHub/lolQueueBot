import fetch from 'node-fetch';
import config from './config.js';

function fetchApi(stringUrl) {
    return fetch(stringUrl + `?api_key=${config.riot.apiKey}`).then(res => res.json());
}

async function knowMyRankByName(summonerName) {
    const summonerObj = await fetchApi("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName);
    const summonerId = summonerObj.id;
    const objRanked = await fetchApi("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId);

    if (!objRanked.length > 0) return "";

    let returnString = "";

    for (let i = 0; i < objRanked.length; i++) {
        if (objRanked[i].queueType == "RANKED_SOLO_5x5") {
            returnString += "Nom d'invocateur: " + objRanked[i].summonerName + "\n";
            returnString += "Rang: " + objRanked[i].tier + " " + objRanked[i].rank + " " + objRanked[i].leaguePoints + " lp\n";
            returnString += "Win: " + objRanked[i].wins + " Losses: " + objRanked[i].losses + " WinRate: " + (objRanked[i].wins / (objRanked[i].wins + objRanked[i].losses) * 100).toFixed(2) + "%";
        }
    }
    return returnString;
}

export {
    knowMyRankByName
}