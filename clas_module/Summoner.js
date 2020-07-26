class Summoner{
    constructor(dateAjout, summonerObj){
        this.dateAjout = dateAjout;
        this.summonerObj = summonerObj;
    }

    getDateAjout(){
        return this.dateAjout;
    }

    setDateAjout(newDate){
        this.dateAjout = newDate;
    }

    getSummonerObj(){
        return this.summonerObj;
    }

    setSummonerObj(newSummonerObj){
        this.summonerObj = newSummonerObj;
    }
}

export {Summoner};