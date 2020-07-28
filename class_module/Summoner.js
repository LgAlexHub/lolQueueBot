import {Time} from '../class_module/Time.js';
class Summoner{
    constructor(summonerMap){
        // Map {TypeObj,ObjTime}
       this.summonerMap = summonerMap;
    }

    getSummonerMap(){
        return this.summonerMap;
    }

    setSummonerMap(newSummonerMap){
        this.summonerMap = newSummonerMap;
    }

    getSummonerObj(){
        return this.summonerMap.get("summoner").getObject();
    }

    getSummonerObjDate(){
        return this.summonerMap.get("summoner").getDateAjout();
    }

    setSummonerObj(summonerObj){
        this.summonerMap.set("summoner",new Time(new Date(),summonerObj));
    }

    getRankObj(){
        return this.summonerMap.get("rank").getObject();
    }

    getRankObjDate(){
        return this.summonerMap.get("rank").getDateAjout();
    }

    setRankObj(rankObj){
        this.summonerMap.set("rank",new Time(new Date(),rankObj));
    }

    
}

export {Summoner};