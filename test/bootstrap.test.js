/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Sails = require('sails'),
  sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  Sails.lift({
    // configuration for testing purposes
    
        log:{
            level:'silent'
        },
        compet:{ 
            api: {
                 filter: {
                     baseurl: 'http://dummyhost/competAPI/',
                     entityName: 'filters'
                 }
           },
           venture: 'venture'
        }
    
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});

