import { getSummonerObjByName, knowMyRankByName } from './func.js';
import { Summoner } from '../class_module/Summoner.js';
import { Time } from '../class_module/Time.js';

const cacheSummoner = new Map();
// Map {SummonerName,SummonerObj}

async function isSummonnerInCache(summonerName) {
    if (cacheSummoner.get(summonerName) == undefined) {
        let resAwait = await getSummonerObjByName(summonerName);
        let timeObj = new Time(new Date(), resAwait);
        let summonerObj = new Summoner(new Map().set("summoner", timeObj));
        cacheSummoner.set(summonerName, summonerObj);
    }
    return cacheSummoner.get(summonerName).getSummonerMap().get("summoner").getObject();
}

async function isRankedInCache(summonerName) {

}

function clearCache() {
}

export {
    isSummonnerInCache, isRankedInCache, clearCache
}