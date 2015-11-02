'use strict';

var AppController = function() {};

// Add default behaviours to the controllers
AppController.prototype.index = function(req, res) {
    res.ok();
};

AppController.extend = function(object) {
    return _.extend({}, AppController.prototype, object);
};

module.exports = AppController;