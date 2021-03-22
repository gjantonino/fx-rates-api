const request = require('request-promise');
const config = require('../config.js');
const { fixerio } = require('../index.js');

module.exports = async function getPairRate(pair) {
    try {
        if(!config.fixerio.allowedPairs.includes(pair)) {
            throw new Error ('Pair of symbols not allowed')
        };

        let baseSymbol = pair.slice(0, 3);
        let targetSymbol = pair.slice(3);

        let options = {
            url: config.fixerio.url + '/latest',
            json: true,
            qs: {
                access_key: config.fixerio.access_key,
                symbols: `${baseSymbol},${targetSymbol}`
            }
        }

        let fixerioRates = await request(options);
        
        if (!fixerioRates.success) {
            console.log(fixerioRates)
            throw new Error (fixerioRates.error.type)
        }

        return (baseSymbol === config.fixerio.defaultBaseSymbol ? fixerioRates.rates[targetSymbol] : (fixerioRates.rates[targetSymbol] / fixerioRates.rates[baseSymbol]));


    } catch (error) {
        console.log(`Error getting rates from fixer.io: ${error.message}`)
        throw new Error (`Error getting rates from fixer.io: ${error.message}`)
    }
}