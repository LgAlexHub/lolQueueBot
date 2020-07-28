class Ranked{
    constructor(dateAjout, rankedObj){
        this.dateAjout = dateAjout;
        this.rankedObj = rankedObj;
    }

    getDateAjout(){
        return this.dateAjout;
    }

    setDateAjout(newDate){
        this.dateAjout = newDate;
    }

    getRankedObj(){
        return this.rankedObj;
    }

    setRankedObj(newRankedObj){
        this.rankedObj = newRankedObj;
    }
}

export {Ranked};