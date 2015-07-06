'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/user/{id}/plan', function() {
  describe('get', function() {
    it('should respond with 200 ok', function(done) {
      request({
        url: 'http://localhost:10010/user/558c29c05d2857d4d92f698d/plan',
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
        expect(json).to.have.property('creater');
        expect(json).to.have.property('depature');
        expect(json).to.have.property('destination');
        expect(json).to.have.property('origin');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'http://localhost:10010/user/558c29c05d2857d4d92f698d/plan',
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

        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 ok', function(done) {
      request({
        url: 'http://localhost:10010/user/558c29c05d2857d4d92f698d/plan',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
          depature: 'Philadelphia'
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        expect(body).to.have.property('creater');
        expect(body).to.have.property('depature');
        expect(body).to.have.property('destination');
        expect(body).to.have.property('origin');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'http://localhost:10010/user/558c29c05d2857d4d92f698d/plan',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        done();
      });
    });

  });

});
