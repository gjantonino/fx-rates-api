const chai = require('chai');
const chaiSpies = require('chai-spies');
const assert = chai.assert;
const expect = chai.expect;

const services = require('../../../../src/services/index');
const nock = require('nock');
const { AssertionError } = require('chai');


describe('getRates Happy Path Tests', () => {
    it('should return the rate for the given pair', async () => {
        try {
            const scope = nock('http://data.fixer.io/api')
                .get(uri => uri.includes('latest'))
                .reply(200, {
                    "success": true,
                    "timestamp": 1519296206,
                    "base": "EUR",
                    "date": "2021-03-22",
                    "rates": {
                        "ARS": 1.566015,
                        "USD": 1.23396,
                    }
                });
            let pair = await services.fixerio.getPairRate('USDARS');
            assert.isNumber(pair);
            nock.cleanAll();
        }
        catch (e) {
            nock.cleanAll()
            assert.fail(e.message)
        }
    })

});
describe('getRates Un-Happy Path Tests', () => {
    it('should throw an error if fixerio api call fails', () => {
        try {
            const scope = nock('http://data.fixer.io/api')
                .get(uri => uri.includes('latest'))
                .replyWithError('Error getting data'
                );
            expect(services.fixerio.getPairRate('USDARS')).throw
            nock.cleanAll();
        }
        catch (e) {
            nock.cleanAll();
            assert.fail(e.message)
        }
    })

})