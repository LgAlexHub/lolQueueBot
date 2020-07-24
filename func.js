const https = require('https');
const { resolve } = require('path');
module.exports = {
    getAsync: function getUrl(stringUrl) {
        return new Promise(async (resolve, reject) => {
            https.get(stringUrl, (res, err) => {
                if (err) return reject(err);
                res.setEncoding('utf8');
                res.on('data', (res) => {
                    resolve(res);
                });
            });
        });
    },
    knowMyRankByName: async function knowMyRankByName(summonerName) {
        let returnString = "";
        let res = await this.getAsync("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=RGAPI-15242448-c7f9-4854-8c68-48e1bb78ec09");
        let summonerObj = JSON.parse(res);
        let summonerId = summonerObj.id;
        let ranked = await this.getAsync("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=RGAPI-15242448-c7f9-4854-8c68-48e1bb78ec09");
        let objRanked = JSON.parse(ranked);

        if (objRanked.length > 0) {
            for (let i = 0; i < objRanked.length; i++) {
                if (objRanked[i].queueType == "RANKED_SOLO_5x5") {
                    returnString+="Nom d'invocateur: "+objRanked[i].summonerName+"\n";
                    returnString+="Rang: "+objRanked[i].tier+" "+objRanked[i].rank+" "+objRanked[i].leaguePoints+" lp\n";
                    returnString+="Win: "+objRanked[i].wins+" Losses: "+objRanked[i].losses+" WinRate: "+(objRanked[i].wins/(objRanked[i].wins+objRanked[i].losses)*100).toFixed(2)+"%";
                }
            }
        }
        return returnString;
    }
}