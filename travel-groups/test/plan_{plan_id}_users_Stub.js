'use strict';
var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;

describe('/plan/{plan_id}/users', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      api.get('//plan/{plan_id}/users')
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
  });

});
