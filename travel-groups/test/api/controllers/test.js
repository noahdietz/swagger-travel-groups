var should = require('chai').should,
  expect = require('chai').expect,
  supertest = require('supertest'),
  app = require('../../../app'), //serves API for testing
  api = supertest('http://localhost:10010'); //url for requests

  /*-------- Start of user path testing --------*/
  describe('user', function(){
    //getUserByID response testing
    it('should return 200 OK response', function(done){
      api.get('/user/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    //getUserByID key-value testing
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

    //createUser key-value testing
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
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.equal('a1b2c3');
        expect(res.body).to.have.property('plan_id');
        expect(res.body.plan_id).to.equal(0);
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.have.length(0);
        done();
      });
    });

    //getPlanByID key-value testing
    it('should return the plan of the specified user', function(done){
      api.get('/user/127/plan')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(11111);
        expect(res.body).to.have.property('creater');
        expect(res.body.creater).to.equal(127);
        expect(res.body).to.have.property('depature');
        expect(res.body.depature).to.equal('3:00 pm');
        expect(res.body).to.have.property('origin');
        expect(res.body.origin).to.equal('San Jose');
        expect(res.body).to.have.property('destination');
        expect(res.body.destination).to.equal('San Francisco');
        expect(res.body).to.have.property('group_member');
        expect(res.body.group_member).to.have.length(0);
        expect(res.body).to.have.property('transportations');
        expect(res.body.transportations).to.have.length(0);
        done();
      });
    });
    /*-------- End of user path testing --------*/

    /*-------- Start of plan path testing --------*/
    describe('plan', function(){

      //addPlan test
      it('should return 200 with key values', function(done){
        api.post('/plan')
        .set('Accept', 'application/json')
        .send({
          creater:127,
          origin:'San Jose',
          destination:'San Francisco',
          depature:'9:00am'
        })
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.have.property('id');
          expect(res.body.id).to.equal(12345);
          expect(res.body).to.have.property('creater');
          expect(res.body.creater).to.equal(127);
          expect(res.body).to.have.property('depature');
          expect(res.body.depature).to.equal('9:00am');
          expect(res.body).to.have.property('origin');
          expect(res.body.origin).to.equal('San Jose');
          expect(res.body).to.have.property('destination');
          expect(res.body.destination).to.equal('San Francisco');
          expect(res.body).to.have.property('group_member');
          expect(res.body.group_member).to.have.length(0);
          expect(res.body).to.have.property('transportations');
          expect(res.body.transportations).to.have.length(0);
          done();
        })
      });
    });
    /*-------- End of plan path testing --------*/
  });