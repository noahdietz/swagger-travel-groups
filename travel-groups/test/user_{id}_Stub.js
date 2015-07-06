'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/user/{id}', function() {
  describe('get', function() {
    it('should respond with 200 target user found', function(done) {
      request({
        url: 'http://localhost:10010/user/558c2bb38bd52d86db854caa',
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
        expect(json).to.have.property('name')
        expect(json).to.have.property('password');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'http://localhost:10010/user/558c2bb38bd52d86db854caa',
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
    it('should respond with 200 update successful', function(done) {
      request({
        url: 'http://localhost:10010/user/558c2bb38bd52d86db854caa',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
          name: 'Amy Green',
          password: '12333333'
        }
      },
      function(error, res, body) {
        if (error) {
          done(error);
          return;
        }

        expect(body).to.have.property('name');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'http://localhost:10010/user/558c2bb38bd52d86db854caa',
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
