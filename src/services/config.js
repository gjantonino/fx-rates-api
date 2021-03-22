module.exports = {
    fixerio: {
        url: 'http://data.fixer.io/api',
        access_key: process.env.FIXERIO_ACCESS_KEY || require('../../local/fixerio.js').FIXERIO_ACCESS_KEY,
        defaultBaseSymbol: 'EUR',
        allowedPairs: [
            'EURUSD',
            'EURARS',
            'USDARS',
            'EURBRL',
            'USDBRL',
            'BRLARS'
        ]
    }
}