var should = require('chai').should,
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:10010');

  describe('User', function(){
    it('should return 200 OK response', function(done){
      api.get('/user/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return an object with keys and values', function(done){
      api.get('/user/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(1);
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(1234567);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(0);
        done();
      });
    });

    it('should create a new user with the specified values', function(done){
      api.post('/user')
      .set('Accept', 'application/json')
      .send({
        name:'Noah Dietz',
        password:'a1b2c3'
      })
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Noah Dietz');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(12345);
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(0);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(0);
        done();
      });
    });
  });