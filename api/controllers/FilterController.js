'use strict';

var AppController = require('./AppController');
var Filter = require('../models/Filter');

/**
 * 
 * @type type
 */
var FilterController = {};

/**
 * 
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
FilterController.index = function(req, res) {

    var venture = sails.config.compet.venture;
    try {
        var filterData = Filter.prepareFilterData(venture);
        filterData.then(function(data) {
            return res.json(200, data);
        }).catch(function(e) {
            return res.json(400,e.message);
        }).done();
    } catch (e) {
        return res.json(400, e.message);
    }
};

module.exports = AppController.extend(FilterController);
