'use strict';

const Joi = require('joi');

const routing = {
    name: 'routing',
    version: '1.0.0',
    async register (server, options) {
        server.route({
            method: 'GET',
            path: '/json',
            handler(request, h) {
                return 'hello, world';
            },
        });

        server.route({
            method: 'POST',
            path: '/json',
            handler(request, h) {
                return 'hello, world';
            },
            config: {
                validate: {
                    payload: {
                        json: Joi.object().required(),
                    },
                    failAction: function (request, h, error) {
                        return error;
                    },
                },
            },
        });
    }
};

module.exports = routing;
