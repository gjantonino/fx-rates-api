const FxRateController = require('./controllers/fxRate/fxRate.js');
const services = require('./services/index.js');
const Joi = require('joi')

module.exports = {
    name: 'routes',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/healthcheck',
                options: {
                    handler: services.healthcheck,
                    description: 'Health Check',
                    notes: 'Returns OK',
                    tags: ['api']
                }
            },
            {
                method: 'GET',
                path: '/rates',
                options: {
                    handler: FxRateController.list,
                    description: 'Get Rates',
                    notes: 'Returns a list of rates',
                    tags: ['api']
                }
            },
            {
                method: 'GET',
                path: '/rates/{pair}',
                options: {
                    handler: FxRateController.get,
                    description: 'Get a single Rate',
                    notes: 'Returns a list of rates',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            pair: Joi.string().min(6).max(6)
                                .required()
                                .description('Symbols pair to search'),
                        })
                    }
                }

            },
            {
                method: 'POST',
                path: '/rates',
                options: {
                    handler: FxRateController.create,
                    description: 'Create Rate',
                    notes: 'Createa new rate based on pair and fee percentage',
                    tags: ['api'],
                    validate: {
                        payload: Joi.object({
                            pair: Joi.string().min(6).max(6).required().description('Symbols pair to search'),
                            feePct: Joi.number().min(0).max(1).required().description('Fee percentage ratio from 0 to 1. i.e: 0.5 (50%)')
                        })
                    }
                }

            },
            {
                method: 'PUT',
                path: '/rates',
                options: {
                    handler: FxRateController.update,
                    description: 'Update Rate',
                    notes: 'Provide document ID and new fee percentage.',
                    tags: ['api'],
                    validate: {
                        query: Joi.object({
                            id: Joi.string().required().description('Document ID to update'),
                            feePct: Joi.number().min(0).max(1).required().description('New Fee percentage ratio from 0 to 1. i.e: 0.5 (50%)')
                        })
                    }
                }
            }
        ]);
    }
}