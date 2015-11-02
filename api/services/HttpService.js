"use strict";

var unirest = require("unirest");

/**
 * HttpService is used to make REST call to external Http API'S.
 */
var HttpService = {};

/**
 * Returns a GET Request object prepared based on the supplied URL.
 * 
 * @param {string} url
 * @returns {object [Request]}
 */
HttpService.newGetRequest = function(url) {
    sails.log.info('GET URL Prepared: ' + url);
    var Request = unirest.get(url);
    Request.type('json');
    return Request;
};

/**
 * Fires the request and returns the promise object.
 * Response object is supplied in resolve and reject both.
 *  
 * @param {object [Request]} Request [unirest Request object]
 * @returns {object} promise
 */
HttpService.fire = function(Request) {
    var defered = Q.defer();
    
    Request.end(function(response) {
        
        var body = response.body;
        if ((response.ok) && (body.message === "SUCCESS")) {
            sails.log(Request.options.url + "\n" + JSON.stringify(response.body));
            defered.resolve(body.data);
        } else {
            //@todo: check the finalized error format.
            sails.log.error(Request.options.url + "\n" + response.body);
            defered.reject(body);
        }
    });
    return defered.promise;
};

module.exports = HttpService;
