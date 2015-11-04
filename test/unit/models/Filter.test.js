var nock = require('nock');
var should = require('should');

var baseURL, venture, entityName;
describe('FilterModel', function() {

    before(function() {

        baseURL = sails.config.compet.api.filter.baseurl;
        venture = sails.config.compet.venture;
        entityName = sails.config.compet.api.filter.entityName;
    });

    describe('#getFilterList()', function() {
        it('Should get list of filters', function(done) {

            nock(baseURL)
                .get('/' + venture + '/' + entityName)
                .reply(200, {
                    message: 'SUCCESS',
                    data: {
                        filters: [
                            "categories",
                            "bricks",
                            "brands",
                            "competitors"
                        ]
                    }
                });

            Filter.getFilterList('venture').then(function(data) {
                var testarr = [
                    "categories",
                    "bricks",
                    "brands",
                    "competitors"
                ];

                (data).should.be.instanceOf(Array).and.have.lengthOf(4);
                data.should.eql(testarr);
                done();
            }).done();
        });
    });

    describe('#prepareFilterData()', function() {
        it('Should Prepare filter data', function(done) {

            nock(baseURL)
                .get('/' + venture + '/' + entityName)
                .reply(200, {
                    message: 'SUCCESS',
                    data: {
                        filters: [
                            "categories"
                        ]
                    }
                })
                .get('/' + venture + '/' + entityName + '?type=categories')
                .reply(200, {
                    message: 'SUCCESS',
                    data: {
                        categories: [
                            {id: "cat1", name: "shoes"}
                        ]
                    }
                })
                .get('/' + venture + '/' + entityName + '?type=sort_by')
                .reply(200, {
                    message: 'SUCCESS',
                    data: {
                        sort_by: [
                            {id: "new", name: "New"},
                            {id: "demand", name: "Demand"}
                        ]
                    }
                })
                ;

            Filter.prepareFilterData('venture').then(function(data) {
                data.should.have.property('categories');
                data.should.have.property('sort_by');
                done();
            }).done();
        });
    });

    describe('#getFilterData()', function() {
        it('Should Get filter data', function(done) {

            nock(baseURL)
                .get('/' + venture + '/' + entityName + '?type=categories')
                .reply(200, {
                    message: 'SUCCESS',
                    data: {
                        categories: [
                            {id: "cat1", name: "shoes"}
                        ]
                    }
                });

            Filter.getFilterData('venture', 'categories').then(function(data) {
                data.should.have.property('categories');
                //data.should.have.property('sort_by');
                done();
            }).done();
        });
    });

});