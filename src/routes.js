const FxRateController = require('./controllers/fxRate/fxRate.js');
const services = require('./services/index.js');

module.exports = {
    name: 'routes',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/',
                handler: services.healthcheck
            },
            {
                method: 'GET',
                path: '/rates',
                handler: FxRateController.list
            },
            {
                method: 'GET',
                path: '/rates/{pair}',
                handler: FxRateController.get
            },
            {
                method: 'POST',
                path: '/rates',
                handler: FxRateController.create
            },
            {
                method: 'PUT',
                path: '/rates',
                handler: FxRateController.update
            }
        ]);
    }
}