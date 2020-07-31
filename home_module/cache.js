import { getSummonerObjByName, knowMyRankByName} from './func.js';
import { Summoner } from '../class_module/Summoner.js';
import { Time } from '../class_module/Time.js';

const cacheSummoner = new Map();

async function isSummonnerInCache(summonerName) {
    clearCache();
    if (cacheSummoner.get(summonerName) == undefined) {
        let resAwait = await getSummonerObjByName(summonerName);
        if (resAwait.id != undefined) {
            let timeObj = new Time(new Date(), resAwait);
            let summonerObj = new Summoner(new Map().set("summoner", timeObj));
            cacheSummoner.set(summonerName, summonerObj);
        }
    }
    return cacheSummoner.get(summonerName);
}

async function isRankedInCache(summonerName) {
    clearCache();
    let summonerObj = await isSummonnerInCache(summonerName);
    if (summonerObj == undefined) return undefined;
    if (summonerObj.getRankObj() == undefined) {
        let rankObj = await knowMyRankByName(summonerName);
        if (rankObj != null) {
            summonerObj.setRankObj(rankObj);
        }
    }
    return summonerObj.getRankObj();
}

function clearCache() {
    let time = new Date().getTime();
    cacheSummoner.forEach((element, key) => {

        if (time - element.getSummonerObjDate().getTime() > 60 * 60 * 1000) {
            cacheSummoner.delete(key);
        }
        if (element.getRankObj() != undefined) {
            if (time - element.getRankObjDate().getTime() > 60 * 60 * 1000) {
                cacheSummoner.get(key).getSummonerMap().delete("rank");
            }
        }
    });
}

export {
    isSummonnerInCache, isRankedInCache
}