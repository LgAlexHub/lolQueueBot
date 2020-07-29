import { Time } from '../class_module/Time.js';
class Summoner {
    constructor(summonerMap) {
        // Map {TypeObj,ObjTime}
        this.summonerMap = summonerMap;
    }

    getSummonerMap() {
        return this.summonerMap;
    }

    setSummonerMap(newSummonerMap) {
        this.summonerMap = newSummonerMap;
    }

    getSummonerObj() {
        if (this.summonerMap.get("summoner") == undefined) {
            return undefined ;
        }else{
            return this.summonerMap.get("summoner").getObject();
        }
    }

    getSummonerObjDate() {
        if (this.summonerMap.get("summoner") == undefined){
            return undefined;
        }else{
            return this.summonerMap.get("summoner").getDateAjout();
        }
    }

    setSummonerObj(summonerObj) {
        this.summonerMap.set("summoner", new Time(new Date(), summonerObj));
    }

    getRankObj() {
        if (this.summonerMap.get("rank") == undefined) {
            return undefined;
        } else {
            return this.summonerMap.get("rank").getObject();
        }
    }

    getRankObjDate() {
        if (this.summonerMap.get("rank") == undefined) {
            return undefined;
        } else {
            return this.summonerMap.get("rank").getDateAjout();
        }

    }

    setRankObj(rankObj) {
        this.summonerMap.set("rank", new Time(new Date(), rankObj));
    }

    deleteRank(){
        this.summonerMap.delete("rank");
    }


}

export { Summoner };