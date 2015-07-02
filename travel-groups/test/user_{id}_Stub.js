'use strict';
var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;

describe('/user/{id}', function() {
  describe('get', function() {
    it('should respond with 200 target user found', function(done) {
      api.get('//user/{id}')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.property('name');
        done();
      });
    });
    it('should respond with default Error', function(done) {
      api.get('//user/{id}')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(default)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.property('name');
        done();
      });
    });
  });

  describe('post', function() {
    it('should respond with 200 update successful', function(done) {
      api.post('//user/{id}')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        expect(res).to.have.property('name');
        done();
      });
    });

    it('should respond with default Error', function(done) {
      api.post('//user/{id}')
      .set('Accept', 'application/json')
      .set({
      })
      .expect(default)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        expect(res).to.have.property('name');
        done();
      });
    });

  });

});
