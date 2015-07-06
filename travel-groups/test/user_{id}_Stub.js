'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('/user/{id}', function() {
  describe('get', function() {
    it('should respond with 200 target user found', function(done) {
      request({
        url: 'http://localhost:10010//user/{id}',
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

        expect(body).to.have.property('name');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'http://localhost:10010//user/{id}',
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

        expect(body).to.have.property('name');
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 update successful', function(done) {
      request({
        url: 'http://localhost:10010//user/{id}',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
          new_info: 'DATA GOES HERE'
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
        url: 'http://localhost:10010//user/{id}',
        qs: {
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': {
        }},
        json: {
          new_info: 'DATA GOES HERE'
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

  });

});
