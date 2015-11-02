"use strict";

/**
 * Model to provide access to filter related data.
 */
var Filter = {
    baseurl : sails.config.compet.api.filter.baseurl,
    entityName : sails.config.compet.api.filter.entityName
};

/**
 * Fetch the List of Filters from API.
 * 
 * @param {string} venture
 * @returns {object [promise]}
 */
Filter.getFilterList = function(venture) {
    var url = this.baseurl + venture + '/' + this.entityName;
    var Request = HttpService.newGetRequest(url);
    return HttpService.fire(Request).then(
        function(data) {
            return data.filters;
        }
    ).catch(function(){
        throw new Error('Filter -> getFilterList Error obtaining filter list');
    });
};

/**
 * Get the data for a filter
 * 
 * @param {string} venture
 * @param {string} type
 * @returns {object [promise]}
 */
Filter.getFilterData = function(venture, type) {
    var url = this.baseurl + venture + '/' + this.entityName + '?type='+type;
    var Request = HttpService.newGetRequest(url);
    return HttpService.fire(Request).catch(function(){
        throw new Error('Filter -> getFilterData[' + type + '] Error obtaining filter data');
    });
};

/**
 * Prepare data for all the filters.
 * 
 * @param {string} venture
 * @returns {object promise}
 */
Filter.prepareFilterData = function(venture) {
    var filterList = this.getFilterList(venture);
    var self = this;
    return filterList.then(function(data) {
        var filterArr = [];
        _.forEach(data, function(val) {
            filterArr.push(self.getFilterData(venture, val));
        });
        return Q.all(filterArr).then(function(data){
            var filters = {};
            _.forEach(data, function(val) {
                _.forEach(val,function(val, key){
                    filters[key] = val;
                });
            });
            return filters;
        });
    });
};

module.exports = Filter;