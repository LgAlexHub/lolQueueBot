import{getSummonerObjByName} from './func.js';
import {Summoner} from '../clas_module/Summoner.js';

async function isSummonnerInCache(summonerName , cacheMap) {
    if (cacheMap.get(summonerName) != undefined) return cacheMap.get(summonerName).getSummonerObj();
    let resAwait = await getSummonerObjByName(summonerName);
    let summonerObj = new Summoner(new Date(),resAwait);
    cacheMap.set(summonerObj.getSummonerObj().name,summonerObj);
    return summonerObj.getSummonerObj();
}

async function isRankedInCache(summonerName, cacheMap) {
    if (cacheMap.get(summonerName) != undefined) return cacheMap.get(summonerName).getSummonerObj();
}

export {
    isSummonnerInCache
}