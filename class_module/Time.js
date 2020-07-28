class Time{
    constructor(dateAjout, object){
        this.dateAjout = dateAjout;
        this.object = object;
    }

    getDateAjout(){
        return this.dateAjout;
    }

    setDateAjout(newDate){
        this.dateAjout = newDate;
    }

    getObject(){
        return this.object;
    }

    setObject(newObject){
        this.object = newObject;
    }
}

export {Time};