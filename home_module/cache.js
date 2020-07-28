import { getSummonerObjByName, knowMyRankByName } from './func.js';
import { Summoner } from '../class_module/Summoner.js';
import { Ranked } from '../class_module/Ranked.js'

async function isSummonnerInCache(summonerName, cacheMap) {
    if (cacheMap.get(summonerName) != undefined) return cacheMap.get(summonerName).getSummonerObj();
    let resAwait = await getSummonerObjByName(summonerName);
    let summonerObj = new Summoner(new Date(), resAwait);
    cacheMap.set(summonerObj.getSummonerObj().name, summonerObj);
    return summonerObj.getSummonerObj();
}

async function isRankedInCache(summonerName, cacheMapSummoner, cacheMapRanked) {
    if (cacheMapRanked.get(summonerName) != undefined) return cacheMapRanked.get(summonerName).getRankedObj();
    let resAwait = await knowMyRankByName(summonerName, cacheMapSummoner);
    let rankedObj = new Ranked(new Date(), resAwait);
    cacheMapRanked.set(summonerName,rankedObj);
    return rankedObj.getRankedObj();
}

export {
    isSummonnerInCache, isRankedInCache
}