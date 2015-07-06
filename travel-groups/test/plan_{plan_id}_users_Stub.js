'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/plan/{plan_id}/users', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: 'http://localhost:10010/plan/558c3260f0a4bbaee2afb8f5/users',
        qs: {
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }}},
      function(error, response, body) {
        if (error) {
          done(error);
          return;
        }
        var json = JSON.parse(body);
        expect(json).to.have.property('users');
        done();
      });
    });

  });

});
