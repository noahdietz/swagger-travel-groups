'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/plan', function() {
  describe('post', function() {
    it('should respond with 200 ok', function(done) {
      request({
        url: 'http://localhost:10010/plan',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
          creater: '558c2c70eecec149dca9740c',
          origin: 'San Diego',
          destination: 'San Jose',
          depature: '3:00 am'
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        expect(body).to.have.property('creater');
        expect(body).to.have.property('origin');
        expect(body).to.have.property('destination');
        expect(body).to.have.property('depature');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'http://localhost:10010/plan',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
          Plan: 'DATA GOES HERE'
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
