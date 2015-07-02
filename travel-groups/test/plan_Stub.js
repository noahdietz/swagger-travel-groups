'use strict';
var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;

describe('/plan', function() {
  describe('post', function() {
    it('should respond with 200 ok', function(done) {
      api.post('//plan')
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
      api.post('//plan')
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
